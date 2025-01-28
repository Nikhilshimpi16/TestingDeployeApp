import React, { useState } from 'react';
import {
    TextField,
    Button,
    Grid,
    Paper,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Divider,
    Box,
    CardContent,
    Container,
    Card,
} from '@mui/material';
import axios from 'axios';

const EmployeeForm = () => {
    const [employee, setEmployee] = useState({
        empName: '',
        empCode: '',
        department: '',
        designation: '',
        grade: '',
        joiningDate: '',
        officeDate: '',
        gender: '',
        category: '',
        photo: null,
        email: '',
    });

    const resetForm = () => {
        setEmployee({
            empName: '',
            empCode: '',
            department: '',
            designation: '',
            grade: '',
            joiningDate: '',
            officeDate: '',
            gender: '',
            category: '',
            photo: '',
            email: '',
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee({ ...employee, [name]: value });
    };

    const handleFileChange = (e) => {
        setEmployee({ ...employee, photo: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('photo', employee.photo);
        formData.append(
            'employee',
            JSON.stringify({
                empName: employee.empName,
                empCode: employee.empCode,
                department: employee.department,
                designation: employee.designation,
                grade: employee.grade,
                joiningDate: employee.joiningDate,
                officeDate: employee.officeDate,
                gender: employee.gender,
                category: employee.category,
                email: employee.email,
            })
        );

        try {
            const response = await axios.post('http://localhost:8080/api/employees', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Employee registered successfully! Username and password have been sent via email.');
            resetForm();
        } catch (error) {
            console.error('Error registering employee:', error);
        }
    };

    return (
        <Container maxWidth="md" sx={{ padding: '2rem 0' }}>
            <Card sx={{ boxShadow: 4, borderRadius: 3, overflow: 'hidden' }}>
                <Box sx={{ backgroundColor: '#1976d2', padding: 1 }}>
                    <Typography
                        variant="h6"
                        align="center"
                        sx={{ color: '#fff', fontWeight: 'bold', textTransform: 'uppercase' }}
                    >
                        Employee Registration
                    </Typography>
                </Box>
                <CardContent sx={{ padding: 4 }}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
                        Employee Information
                    </Typography>
                    <Divider sx={{ marginBottom: 3 }} />
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            {/* Row 1 */}
                            <Grid item xs={6}>
                            <TextField
                                label="Employee Name"
                                variant="outlined"
                                name="empName"
                                fullWidth
                                required
                                value={employee.empName}
                                onChange={(e) => {
                                    const regex = /^[A-Za-z\s]*$/; // Regex to allow only alphabets and spaces
                                    if (regex.test(e.target.value)) {
                                        handleChange(e); // Update state only if the value is valid
                                    }
                                }}
                            />
                        </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Employee Code"
                                    variant="outlined"
                                    name="empCode"
                                    fullWidth
                                    required
                                    value={employee.empCode}
                                    onChange={handleChange}
                                />
                            </Grid>

                            {/* Row 2 */}
                            <Grid item xs={6}>
                                <TextField
                                    label="Department"
                                    variant="outlined"
                                    name="department"
                                    fullWidth
                                    required
                                    value={employee.department}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Designation"
                                    variant="outlined"
                                    name="designation"
                                    fullWidth
                                    required
                                    value={employee.designation}
                                    onChange={handleChange}
                                />
                            </Grid>

                            {/* Row 3 */}
                            <Grid item xs={6}>
                                <TextField
                                    label="Grade"
                                    variant="outlined"
                                    name="grade"
                                    fullWidth
                                    required
                                    value={employee.grade}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Joining Date"
                                    variant="outlined"
                                    name="joiningDate"
                                    type="date"
                                    fullWidth
                                    required
                                    InputLabelProps={{ shrink: true }}
                                    value={employee.joiningDate}
                                    onChange={handleChange}
                                />
                            </Grid>

                            {/* Row 4 */}
                            <Grid item xs={6}>
                                <TextField
                                    label="Office Date"
                                    variant="outlined"
                                    name="officeDate"
                                    type="date"
                                    fullWidth
                                    required
                                    InputLabelProps={{ shrink: true }}
                                    value={employee.officeDate}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth variant="outlined" required>
                                    <InputLabel>Gender</InputLabel>
                                    <Select
                                        label="Gender"
                                        name="gender"
                                        value={employee.gender}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="Male">Male</MenuItem>
                                        <MenuItem value="Female">Female</MenuItem>
                                        <MenuItem value="Other">Other</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            {/* Row 5 */}
                            <Grid item xs={6}>
                                <FormControl fullWidth variant="outlined" required>
                                    <InputLabel>Category</InputLabel>
                                    <Select
                                        label="Category"
                                        name="category"
                                        value={employee.category}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="Permanent">Permanent</MenuItem>
                                        <MenuItem value="Contract">Contract</MenuItem>
                                        <MenuItem value="Intern">Intern</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Email"
                                    variant="outlined"
                                    name="email"
                                    fullWidth
                                    required
                                    value={employee.email}
                                    onChange={handleChange}
                                />
                            </Grid>

                            {/* Row 6 */}
                           <Grid item xs={6}>
                            <Typography variant="body1">Upload File:</Typography>
                            <input
                                type="file"
                                accept="image/*,application/pdf"
                                onChange={handleFileChange}
                            />
                            </Grid>

                            {/* Submit Button */}
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary" fullWidth>
                                    Register Employee
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
        </Container>
    );
};

export default EmployeeForm;
