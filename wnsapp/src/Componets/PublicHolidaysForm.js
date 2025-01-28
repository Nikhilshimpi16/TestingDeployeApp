import React, { useState, useEffect } from 'react';
import { Button, TextField, Grid, Typography, Container, IconButton, Card, CardContent, CardActions, Box, Snackbar, Alert, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ReportIcon from '@mui/icons-material/Report';
import dayjs from 'dayjs';
import WaterDropIcon from '@mui/icons-material/WaterDrop'

const PublicHolidaysForm = () => {
    const [holidays, setHolidays] = useState([]);
    const [formData, setFormData] = useState({
        holidayName: '',
        holidayDate: '',
    });
    const [editing, setEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [openAlert, setOpenAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [openReport, setOpenReport] = useState(false);

    useEffect(() => {
        fetchHolidays();
    }, []);

    const fetchHolidays = () => {
        axios.get('http://localhost:8080/api/holidays')
            .then(response => setHolidays(response.data))
            .catch(error => console.error('Error fetching holidays', error));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddHoliday = () => {
        if (!formData.holidayName || !formData.holidayDate) {
            setAlertMessage('Please fill in all fields');
            setOpenAlert(true);
            return;
        }

        axios.post('http://localhost:8080/api/holidays', formData)
            .then(() => {
                alert("Added succefully !!")
                fetchHolidays();
                setFormData({ holidayName: '', holidayDate: '' });
                
            })
            .catch(error => console.error('Error adding holiday', error));
    };

    const handleEditHoliday = (id) => {
        setEditing(true);
        const holiday = holidays.find(holiday => holiday.id === id);
        setFormData({
            holidayName: holiday.holidayName,
            holidayDate: dayjs(holiday.holidayDate).format('YYYY-MM-DD'),
        });
        setCurrentId(id);
    };

    const handleUpdateHoliday = () => {
        if (!formData.holidayName || !formData.holidayDate) {
            setAlertMessage('Please fill in all fields');
            setOpenAlert(true);
            return;
        }

        axios.put(`http://localhost:8080/api/holidays/${currentId}`, formData)
            .then(() => {
                fetchHolidays();
                setEditing(false);
                setFormData({ holidayName: '', holidayDate: '' });
            })
            .catch(error => console.error('Error updating holiday', error));
    };

    const handleDeleteHoliday = (id) => {
        axios.delete(`http://localhost:8080/api/holidays/${id}`)
            .then(() => {
                fetchHolidays();
                setAlertMessage('Holiday deleted successfully');
                setOpenAlert(true);
            })
            .catch(error => {
                console.error('Error deleting holiday', error);
                setAlertMessage('Failed to delete holiday');
                setOpenAlert(true);
            });
    };

    const handleReportOpen = () => {
        setOpenReport(true);
    };

    const handleReportClose = () => {
        setOpenReport(false);
    };

    const handleCloseAlert = () => {
        setOpenAlert(false);
    };

    return (
        <Container sx={{ marginTop: 4, position: 'relative' }}>
            {/* Title Section */}
            <Typography variant="h5" gutterBottom align="center" color="primary" sx={{ fontWeight: 'bold', marginBottom: 3 }}>
                Public Holiday Management
            </Typography>

            {/* Report Icon */}
            <IconButton
                onClick={handleReportOpen}
                sx={{
                    position: 'absolute',
                    top: 10,
                    right: 180,
                    color: 'primary.main',
                    zIndex: 999,
                }}
            >
                <ReportIcon />
            </IconButton>

            {/* Form Section */}
            <Box display="flex" justifyContent="center">
                <Card sx={{
                    boxShadow: 4,
                    marginBottom: 4,
                    padding: 3,
                    borderRadius: 3,
                    backgroundColor: '#fff',
                    maxWidth: 600,
                    width: '100%',
                }}>
                    <CardContent>
                        <Grid container spacing={2} justifyContent="center">
                            <Grid item xs={12} sm={10}>
                                <TextField
                                    label="Holiday Name"
                                    variant="outlined"
                                    fullWidth
                                    name="holidayName"
                                    value={formData.holidayName}
                                    onChange={handleInputChange}
                                    sx={{ marginBottom: 2 }}
                                    inputProps={{ style: { fontSize: 15 } }}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={10}>
                                <TextField
                                    label="Holiday Date"
                                    variant="outlined"
                                    fullWidth
                                    type="date"
                                    name="holidayDate"
                                    value={formData.holidayDate}
                                    onChange={handleInputChange}
                                    sx={{ marginBottom: 2 }}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'center' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={editing ? handleUpdateHoliday : handleAddHoliday}
                            sx={{ padding: '8px 24px', fontWeight: 'bold', textTransform: 'none' }}
                        >
                            {editing ? 'Update Holiday' : 'Add Holiday'}
                        </Button>
                    </CardActions>
                </Card>
            </Box>

            {/* Snackbar for Alert Message */}
            <Snackbar
                open={openAlert}
                autoHideDuration={4000}
                onClose={handleCloseAlert}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert severity="error" onClose={handleCloseAlert}>
                    {alertMessage}
                </Alert>
            </Snackbar>

            {/* Report Modal with Styled Table */}
            <Modal open={openReport} onClose={handleReportClose}>
                <Box sx={{
                    padding: 8,
                    backgroundColor: '#fff',
                    margin: '10% auto',
                    maxWidth: 800,
                    borderRadius: 2,
                    overflowY: 'auto',
                    maxHeight: '50vh',
                    boxShadow: 4,
                }}>
           <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 2 }}>
                    <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', color: 'primary.main', fontWeight: 'bold', marginBottom: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
        <WaterDropIcon sx={{ color: '#00bcd4', marginRight: 1 }} />
        <Typography variant="h5" component="h2" sx={{fontFamily:'serif', fontWeight:'600'}}>
          Water Billing Management System
        </Typography>
      </Box>
                        Public Holidays Report
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead sx={{ backgroundColor: 'primary.main' }}>
                                <TableRow>

                                                 <TableCell style={{ backgroundColor: '#7cc5d9', color: 'white' }}> Holiday Name </TableCell>
                                                 <TableCell style={{ backgroundColor: '#7cc5d9', color: 'white' }}> Holiday Date </TableCell>
                                                 <TableCell style={{ backgroundColor: '#7cc5d9', color: 'white' }}> Actions </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {holidays.map((holiday) => (
                                    <TableRow key={holiday.id}>
                                        <TableCell>{holiday.holidayName}</TableCell>
                                        <TableCell>{dayjs(holiday.holidayDate).format('YYYY-MM-DD')}</TableCell>
                                        <TableCell>
                                            <IconButton onClick={() => handleEditHoliday(holiday.id)} color="primary">
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton onClick={() => handleDeleteHoliday(holiday.id)} color="error">
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    </Box>
                </Box>
            </Modal>
        </Container>
    );
};

export default PublicHolidaysForm;
