import React, { useState, useEffect } from 'react';
import { 
  TextField, 
  Button, 
  Grid, 
  Box, 
  Typography, 
  Container, 
  IconButton, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Modal ,
  
} from '@mui/material';
import { Edit, Delete, Visibility } from '@mui/icons-material';
import axios from 'axios';
import WaterDropIcon from '@mui/icons-material/WaterDrop'

const DepartmentForm = () => {
  const [formData, setFormData] = useState({
    depName: '',
    shortName: '',
    description: '',
  });
  const [error, setError] = useState({
    depName: '',
    shortName: '',
    description: '',
  });
  const [departments, setDepartments] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [reportModalOpen, setReportModalOpen] = useState(false);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/department');
      setDepartments(response.data);
    } catch (err) {
      console.error('Error fetching departments', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let tempError = { depName: '', shortName: '', description: '' };
    let isValid = true;

    if (!formData.depName) {
      tempError.depName = 'Department Name is required';
      isValid = false;
    }
    if (!formData.shortName) {
      tempError.shortName = 'Short Name is required';
      isValid = false;
    }
    if (!formData.description) {
      tempError.description = 'Description is required';
      isValid = false;
    }

    setError(tempError);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        if (editMode) {
          await axios.put(`http://localhost:8080/api/department/${currentId}`, formData);
          alert('Department updated successfully');
        } else {
          await axios.post('http://localhost:8080/api/department', formData);
          alert('Department added successfully');
        }
        fetchDepartments();
        resetForm();
      } catch (err) {
        console.error('Error submitting form', err);
        alert('There was an error submitting the form');
      }
    }
  };

  const handleEdit = (id) => {
    const department = departments.find((dept) => dept.id === id);
    if (department) {
      setFormData(department);
      setEditMode(true);
      setCurrentId(id);
      setReportModalOpen(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      try {
        await axios.delete(`http://localhost:8080/api/department/${id}`);

        alert('Department deleted successfully'); 
        fetchDepartments();
      } catch (err) {
        console.error('Error deleting department', err);
      }
    }
  };

  const resetForm = () => {
    setFormData({ depName: '', shortName: '', description: '' });
    setError({ depName: '', shortName: '', description: '' });
    setEditMode(false);
    setCurrentId(null);
  };

  const toggleReportModal = () => {
    setReportModalOpen((prev) => !prev);
  };

  return (
    <Container maxWidth="md">
       <Box sx={{ boxShadow: 3, borderRadius: 2, padding: 4, backgroundColor: '#fff', marginTop: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#3f51b5' ,fontFamily:'sans',marginLeft:'250px'}}>
            Department Registration
          </Typography>
          <IconButton color="primary" onClick={toggleReportModal}>
            <Visibility />
          </IconButton>
        </Box>
        
        <form onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2} sx={{ marginBottom: 3 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Department Name"
                variant="outlined"
                fullWidth
                name="depName"
                value={formData.depName}
                onChange={handleChange}
                error={Boolean(error.depName)}
                helperText={error.depName}
                sx={{ backgroundColor: '#f4f6f8' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Short Name"
                variant="outlined"
                fullWidth
                name="shortName"
                value={formData.shortName}
                onChange={handleChange}
                error={Boolean(error.shortName)}
                helperText={error.shortName}
                sx={{ backgroundColor: '#f4f6f8' }}
              />
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              name="description"
              value={formData.description}
              onChange={handleChange}
              error={Boolean(error.description)}
              helperText={error.description}
              sx={{ backgroundColor: '#f4f6f8' }}
            />
          </Grid>

          <Box sx={{ textAlign: 'center', marginTop: 3 }}>
            <Button type="submit" variant="contained" color="primary" sx={{ width: '200px', textTransform: 'none', fontWeight: 'bold' }}>
              {editMode ? 'Update' : 'Submit'}
            </Button>
          </Box>
        </form>
      </Box>

      

      <Modal
        open={reportModalOpen}
        onClose={toggleReportModal}
        aria-labelledby="department-report-title"
        aria-describedby="department-report-description"
      >
         <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 2 }}>
      {/* Title with Water Drop Icon */}
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
        <WaterDropIcon sx={{ color: '#00bcd4', marginRight: 1 }} />
        <Typography variant="h5" component="h2" sx={{fontFamily:'serif' , fontWeight:'600'}}>
          Water Billing Management System
        </Typography>
      </Box>

      {/* Department Report Title */}
      <Typography id="department-report-title" variant="h6" component="h2" sx={{ marginBottom: 2 }}>
        Department Report
      </Typography>

      {/* Table Container */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ backgroundColor: '#ffab40', color: 'white' }}> ID </TableCell>
              <TableCell style={{ backgroundColor: '#ffab40', color: 'white' }}> Department Name </TableCell>
              <TableCell style={{ backgroundColor: '#ffab40', color: 'white' }}> Short Name </TableCell>
              <TableCell style={{ backgroundColor: '#ffab40', color: 'white' }}> Description </TableCell>
              <TableCell style={{ backgroundColor: '#ffab40', color: 'white' }}> Actions </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {departments.map((dept) => (
              <TableRow key={dept.id}>
                <TableCell>{dept.id}</TableCell>
                <TableCell>{dept.depName}</TableCell>
                <TableCell>{dept.shortName}</TableCell>
                <TableCell>{dept.description}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEdit(dept.id)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDelete(dept.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
      </Modal>
    </Container>
  );
};

export default DepartmentForm;
