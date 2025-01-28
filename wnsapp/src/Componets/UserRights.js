import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    AppBar,
    Toolbar,
    Typography,
    Container,
    Paper,
    Box,
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Button,
    Divider,
    CardContent,
    Card,
    List,
    
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";

const UserRightsForm = () => {
    const [employees, setEmployees] = useState([]); // List of employees
    const [selectedEmployee, setSelectedEmployee] = useState(""); // Selected employee code
    const navigate = useNavigate();
    const [forms, setForms] = useState([
        { name: 'Department Form', checked: false },
        { name: 'Public Holidays Form', checked: false },
        { name: 'Meter Registration Form', checked: false },
        { name: 'Consumer Registration Form', checked: false },
        { name: 'Water Bill Form', checked: false },
        { name: 'Payment Form', checked: false },
    ]); // List of forms
    const [errorMessage, setErrorMessage] = useState("");
    const textColor = "#ffffff"; // White text for contrast

    // Fetch employee list on component mount
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/employees");
                setEmployees(response.data);
            } catch (error) {
                console.error("Error fetching employees:", error.message);
                setErrorMessage("Failed to load employee list.");
            }
        };
        fetchEmployees();
    }, []);

     // Reset form to initial state
     const resetForm = () => {
        setSelectedEmployee("");
        setForms((prevForms) => prevForms.map((form) => ({ ...form, checked: false })));
    }
    // Handle form submission
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (!selectedEmployee) {
            alert("Please select an employee.");
            return;
        }
        const selectedForms = forms.filter((form) => form.checked).map((form) => form.name);
        const requestData = {
            empCode: selectedEmployee,
            rights: selectedForms,
        };

        try {
            await axios.post("http://localhost:8080/api/user-rights", requestData);
            alert("Rights assigned successfully!");
            resetForm();
        } catch (error) {
            console.error(error.response?.data || error.message);
            alert("Error assigning rights.");
        }
    };

    

    // Handle checkbox change
    const handleCheckboxChange = (index) => {
        setForms((prevForms) =>
            prevForms.map((form, i) =>
                i === index ? { ...form, checked: !form.checked } : form
            )
        );
    };

    return (
        <>
            {/* Form Container */}
            <Container maxWidth="md" sx={{ padding: '2rem 0' }}>
                <Card sx={{ boxShadow: 4, borderRadius: 3, overflow: 'hidden' }}>
                    <Paper elevation={4} sx={{ padding: 4, borderRadius: 3 }}>
                        <Box sx={{ backgroundColor: '#1976d2', padding: 1 }}>
                            <Typography
                                variant="h6"
                                align="center"
                                sx={{ color: '#fff', fontWeight: 'bold', textTransform: 'uppercase' }}
                            >
                                User Rights Management
                            </Typography>
                        </Box>
                        <CardContent sx={{ padding: 4 }}>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
                                Assign Rights to Employees
                            </Typography>
                            <Divider sx={{ marginBottom: 3 }} />

                            {errorMessage && (
                                <Typography color="error" align="center" gutterBottom>
                                    {errorMessage}
                                </Typography>
                            )}

                            <Box
                                component="form"
                                onSubmit={handleFormSubmit}
                                sx={{ display: "flex", flexDirection: "column", gap: 3 }}
                            >
                                {/* Employee Selection */}
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>Employee</InputLabel>
                                    <Select
                                        value={selectedEmployee}
                                        onChange={(e) => setSelectedEmployee(e.target.value)}
                                        label="Employee"
                                        required
                                    >
                                        <List value="">Select Employee</List>
                                        {employees.map((employee) => (
                                            <MenuItem key={employee.empCode} value={employee.empCode}>
                                                {employee.empName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                {/* Forms Selection */}
                                <FormGroup>
                                    <Typography variant="h6" gutterBottom>
                                        Select Forms:
                                    </Typography>
                                    {forms.map((form, index) => (
                                        <FormControlLabel
                                            key={index}
                                            control={
                                                <Checkbox
                                                    checked={form.checked}
                                                    onChange={() => handleCheckboxChange(index)}
                                                />
                                            }
                                            label={form.name}
                                        />
                                    ))}
                                </FormGroup>

                                {/* Action Buttons */}
                                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <Button type="submit" variant="contained" color="primary">
                                        Assign Rights
                                    </Button>
                                    {/* EMP-Login Button */}
          <Button
            variant="contained"
            color="secondary"
            startIcon={<LoginIcon />}
            sx={{
              backgroundColor: "#ff5722", // Orange button color
              color: textColor,
              fontWeight: "bold",
              textTransform: "none",
              fontFamily: "Poppins",
              "&:hover": {
                backgroundColor: "#e64a19", // Darker shade on hover
              },
            }}
            onClick={()=> navigate("/employee-login")}
          >
            EMP-Login
          </Button>
                                </Box>
                            </Box>
                        </CardContent>
                    </Paper>
                </Card>
            </Container>
        </>
    );
};

export default UserRightsForm;
