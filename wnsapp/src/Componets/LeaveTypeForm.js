import React, { useState, useEffect } from 'react';
import { Button, TextField, Grid, Typography,  Container, MenuItem, Select, InputLabel, FormControl, IconButton, Card, CardContent, CardActions } from '@mui/material';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const LeaveTypeForm = () => {
    const [leaveTypes, setLeaveTypes] = useState([]);
    const [formData, setFormData] = useState({
        leaveTypeName: '',
        gender: '',
        yearlyLimit: '',
        carryforwardLimit: '',
    });
    const [editing, setEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    useEffect(() => {
        fetchLeaveTypes();
    }, []);

    const fetchLeaveTypes = () => {
        axios.get('http://localhost:8080/api/leaveTypes')
            .then(response => {
                setLeaveTypes(response.data);
            })
            .catch(error => console.error('Error fetching leave types', error));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddLeaveType = () => {
        axios.post('http://localhost:8080/api/leaveTypes', formData)
            .then(response => {
                fetchLeaveTypes();
                setFormData({
                    leaveTypeName: '',
                    gender: '',
                    yearlyLimit: '',
                    carryforwardLimit: '',
                });
            })
            .catch(error => console.error('Error adding leave type', error));
    };

    const handleEditLeaveType = (id) => {
        setEditing(true);
        const leaveType = leaveTypes.find(type => type.id === id);
        setFormData({
            leaveTypeName: leaveType.leaveTypeName,
            gender: leaveType.gender,
            yearlyLimit: leaveType.yearlyLimit,
            carryforwardLimit: leaveType.carryforwardLimit,
        });
        setCurrentId(id);
    };

    const handleUpdateLeaveType = () => {
        axios.put(`http://localhost:8080/api/leaveTypes/${currentId}`, formData)
            .then(response => {
                fetchLeaveTypes();
                setEditing(false);
                setFormData({
                    leaveTypeName: '',
                    gender: '',
                    yearlyLimit: '',
                    carryforwardLimit: '',
                });
            })
            .catch(error => console.error('Error updating leave type', error));
    };

    const handleDeleteLeaveType = (id) => {
        axios.delete(`http://localhost:8080/api/leaveTypes/${id}`)
            .then(response => {
                fetchLeaveTypes();
            })
            .catch(error => console.error('Error deleting leave type', error));
    };

    return (
        <Container sx={{ marginTop: 4 }}>
            <Typography variant="h4" gutterBottom align="center" color="primary">
                Leave Type Management
            </Typography>

            {/* Form Section */}
            <Card sx={{ boxShadow: 2, marginBottom: 4, padding: 3, borderRadius: 2, backgroundColor: '#fff', maxWidth: 600, marginLeft: 'auto', marginRight: 'auto' }}>
                <CardContent sx={{ width: '100%' }}>
                    <Typography variant="h5" gutterBottom align="center" color="textPrimary">
                        {editing ? 'Edit Leave Type' : 'Add New Leave Type'}
                    </Typography>
                    <Grid container spacing={3} justifyContent="center">
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField
                                label="Leave Type Name"
                                variant="outlined"
                                fullWidth
                                name="leaveTypeName"
                                value={formData.leaveTypeName}
                                onChange={handleInputChange}
                                sx={{ marginBottom: 2 }}
                                inputProps={{ style: { fontSize: 16 } }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <FormControl fullWidth sx={{ marginBottom: 2 }}>
                                <InputLabel>Gender</InputLabel>
                                <Select
                                    label="Gender"
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleInputChange}
                                >
                                    <MenuItem value="Male">Male</MenuItem>
                                    <MenuItem value="Female">Female</MenuItem>
                                    <MenuItem value="Other">Other</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField
                                label="Yearly Limit"
                                variant="outlined"
                                fullWidth
                                type="number"
                                name="yearlyLimit"
                                value={formData.yearlyLimit}
                                onChange={handleInputChange}
                                sx={{ marginBottom: 2 }}
                                inputProps={{ style: { fontSize: 16 } }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField
                                label="Carryforward Limit"
                                variant="outlined"
                                fullWidth
                                type="number"
                                name="carryforwardLimit"
                                value={formData.carryforwardLimit}
                                onChange={handleInputChange}
                                sx={{ marginBottom: 2 }}
                                inputProps={{ style: { fontSize: 16 } }}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={editing ? handleUpdateLeaveType : handleAddLeaveType}
                        sx={{ fontSize: '16px', fontWeight: 'bold', padding: '10px 20px', borderRadius: '5px' }}
                    >
                        {editing ? 'Update Leave Type' : 'Add Leave Type'}
                    </Button>
                </CardActions>
            </Card>

            {/* Leave Type List Section */}
            <Grid container spacing={3} justifyContent="center">
                {leaveTypes.map((leaveType) => (
                    <Grid item xs={12} sm={6} md={4} key={leaveType.id}>
                        <Card sx={{
                            padding: 3,
                            boxShadow: 2,
                            borderRadius: 2,
                            backgroundColor: '#fff',
                            '&:hover': { boxShadow: 4 },
                        }}>
                            <CardContent>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                    {leaveType.leaveTypeName}
                                </Typography>
                                <Typography variant="body1">Gender: {leaveType.gender}</Typography>
                                <Typography variant="body1">Yearly Limit: {leaveType.yearlyLimit}</Typography>
                                <Typography variant="body1">Carryforward Limit: {leaveType.carryforwardLimit}</Typography>
                            </CardContent>
                            <CardActions sx={{ justifyContent: 'flex-end' }}>
                                <IconButton onClick={() => handleEditLeaveType(leaveType.id)} sx={{ marginRight: 1, color: 'primary.main' }}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => handleDeleteLeaveType(leaveType.id)} sx={{ color: 'red' }}>
                                    <DeleteIcon />
                                </IconButton>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default LeaveTypeForm;
