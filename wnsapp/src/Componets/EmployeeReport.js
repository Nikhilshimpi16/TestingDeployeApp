import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Typography,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import { Edit, Delete, Download } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const EmployeeReport = () => {
    const [employees, setEmployees] = useState([]);
    const [employee , setEmployee]  = useState([]);
    const [isEditing, setIsEditing] = useState(null);
     const [openEditDialog, setOpenEditDialog] = useState(false);
    const [open, setOpen] = useState(false);
    const [currentEmployee, setCurrentEmployee] = useState({
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
    const [addEmployeeOpen, setAddEmployeeOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get('http://localhost:8080/api/employees')
            .then((response) => {
                setEmployees(response.data);
            })
            .catch((error) => {
                console.error('There was an error fetching the employee data!', error);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee({ ...employee, [name]: value });
    };


   

    const handleAddEmployeeOpen = () => {
        setCurrentEmployee({
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
        setAddEmployeeOpen(true);
    };

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

    const handleAddEmployeeClose = () => {
        setAddEmployeeOpen(false);
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

    const handleEditClick = (employee) => {
        setCurrentEmployee(employee);
        setOpen(true);
    };

    const handleDeleteClick = (id) => {
        axios
            .delete(`http://localhost:8080/api/employees/${id}`)
            .then(() => {
                setEmployees(employees.filter((emp) => emp.id !== id));
                alert("Employee Deleted Successfully!");  
                      })
            .catch((error) => {
                console.error('There was an error deleting the employee!', error);
            });
    };

    const handleDialogClose = () => {
        setOpen(false);
    };
    const handleFileChange = (e) => {
        setEmployee({ ...employee, photo: e.target.files[0] });
    };

    const handleDownload = () => {
        axios({
            url: 'http://localhost:8080/api/employees/report/pdf', // API endpoint for PDF download
            method: 'GET',
            responseType: 'blob', // Important to handle the response as a file
        })
        .then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'employee_report.pdf'); // Set the default file name
            document.body.appendChild(link);
            link.click(); // Trigger the download
            document.body.removeChild(link);
        })
        .catch((error) => {
            console.error('There was an error downloading the report!', error);
        });
    };
 // Fetch employees from backend
 const fetchEmployees = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/employees");
    setEmployees(response.data);
  } catch (error) {
    console.error("Error fetching employees:", error);
  }
};

    // Handle form submission for edit
  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:8080/api/employees/${currentEmployee.id}`, currentEmployee);
      setOpenEditDialog(false);
      fetchEmployees(); // Refresh data
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };
  useEffect(() => {
    fetchEmployees();
  }, []);

   // Open edit dialog
   const handleEdit = (employee) => {
    setCurrentEmployee(employee);
    setOpenEditDialog(true);
  };

    return (
        <Paper style={{ padding: '1em', margin: '2em auto', maxWidth: '1000px' }}>
            <Typography variant="h5" align="center" gutterBottom sx={{fontFamily:'poppins' , fontWeight:'600'}}>
                Employee Report
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={handleAddEmployeeOpen}
                style={{ marginBottom: '1em' }}
            >
                Add Employee
            </Button>

            <Button
                variant="contained"
                color="secondary"
                onClick={handleDownload}
                style={{ marginLeft: '1em', marginBottom: '1em' }}
            >
                Download Report (PDF)
            </Button>

            <TableContainer
                component={Paper}
                style={{ border: '2px solid #ccc', maxHeight: 400, overflowY: 'auto' }}
            >
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell  style={{ backgroundColor: '#26a69a', color: 'black' }}>EmpCode</TableCell>
                            <TableCell  style={{ backgroundColor: '#26a69a', color: 'black' }} >EmpName</TableCell>
                            <TableCell  style={{ backgroundColor: '#26a69a', color: 'black' }} >Department</TableCell>
                            <TableCell  style={{ backgroundColor: '#26a69a', color: 'black' }} >Designation</TableCell>
                            <TableCell   style={{ backgroundColor: '#26a69a', color: 'black' }}>Grade</TableCell>
                            <TableCell  style={{ backgroundColor: '#26a69a', color: 'black' }}>Joining Date</TableCell>
                            <TableCell  style={{ backgroundColor: '#26a69a', color: 'black' }}>Office Date</TableCell>
                            <TableCell style={{ backgroundColor: '#26a69a', color: 'black' }}>Gender</TableCell>
                            <TableCell style={{ backgroundColor: '#26a69a', color: 'black' }}>Category</TableCell>
                            <TableCell style={{ backgroundColor: '#26a69a', color: 'black' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees.map((employee) => (
                            <TableRow key={employee.id}>
                                <TableCell>{employee.empCode}</TableCell>
                                <TableCell>{employee.empName}</TableCell>
                                <TableCell>{employee.department}</TableCell>
                                <TableCell>{employee.designation}</TableCell>
                                <TableCell>{employee.grade}</TableCell>
                                <TableCell>
                                    {new Date(employee.joiningDate).toLocaleDateString()}
                                </TableCell>
                                <TableCell>
                                    {new Date(employee.officeDate).toLocaleDateString()}
                                </TableCell>
                                <TableCell>{employee.gender}</TableCell>
                                <TableCell>{employee.category}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEdit(employee)}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton onClick={() => handleDeleteClick(employee.id)}>
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

             {/* Edit Dialog */}
      {currentEmployee && (
        <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
          <DialogTitle>Edit Employee</DialogTitle>
          <DialogContent>
            {Object.keys(currentEmployee).map((key) => (
              key !== "id" && (
                <TextField
                  key={key}
                  label={key}
                  value={currentEmployee[key]}
                  onChange={(e) =>
                    setCurrentEmployee({ ...currentEmployee, [key]: e.target.value })
                  }
                  fullWidth
                  margin="normal"
                />
              )
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEditDialog(false)} color="secondary">Cancel</Button>
            <Button onClick={handleSave} color="primary">Save</Button>
          </DialogActions>
        </Dialog>
      )}

            {/* Add Employee Dialog */}
            <Dialog open={addEmployeeOpen} onClose={handleAddEmployeeClose}>
                <DialogTitle>Add Employee</DialogTitle>
                <DialogContent>

                     <Grid container spacing={2}>
  {/* Row 1: Employee Name and Code */}
  <Grid item xs={12} sm={6}>
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
  <Grid item xs={12} sm={6}>
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

  {/* Row 2: Department and Designation */}
  <Grid item xs={12} sm={6}>
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
  <Grid item xs={12} sm={6}>
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

  {/* Row 3: Grade and Joining Date */}
  <Grid item xs={12} sm={6}>
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
  <Grid item xs={12} sm={6}>
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

  {/* Row 4: Office Date and Gender */}
  <Grid item xs={12} sm={6}>
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
  <Grid item xs={12} sm={6}>
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

  {/* Row 5: Category and Email */}
  <Grid item xs={12} sm={6}>
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
  <Grid item xs={12} sm={6}>
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

  {/* Row 6: File Upload */}
  <Grid item xs={12}>
    <Typography variant="body1">Upload File:</Typography>
    <input
      type="file"
      accept="image/*,application/pdf"
      onChange={handleFileChange}
    />
  </Grid>
</Grid>
 </DialogContent>
                <DialogActions>
  <Button onClick={handleAddEmployeeClose} color="primary">
    Cancel
  </Button>
  <Button onClick={handleSubmit} color="secondary">
    Save
  </Button>
</DialogActions>
                
            </Dialog>
            
        </Paper>
        
    );
};

export default EmployeeReport;
