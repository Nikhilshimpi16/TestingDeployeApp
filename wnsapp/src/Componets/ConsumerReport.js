import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography, Toolbar, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { Edit, Delete, Download } from '@mui/icons-material';

const ConsumerReport = () => {
    const [consumers, setConsumers] = useState([]);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [editConsumer, setEditConsumer] = useState({
        consumerNo: '',
        consumerName: '',
        addressLine1: '',
        addressLine2: '',
        mobileNo: '',
        age: '',
        businessOrJob: '',
        dateOfTapConnected: '',
        meterNo: '',
        waterCourseName: '',
        email: ''
    });

    useEffect(() => {
        fetchAllConsumers();
    }, []);

    const fetchAllConsumers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/consumers');
            setConsumers(response.data);
        } catch (error) {
            console.error("Error fetching consumers:", error);
        }
    };

    const deleteConsumer = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/consumers/${id}`);
            alert("Consumer Deleted Successfully!");
            fetchAllConsumers();
        } catch (err) {
            console.error('Failed to delete consumer', err);
        }
    };

    const handleEditOpen = (consumer) => {
        setEditConsumer(consumer || { consumerNo: '', consumerName: '', addressLine1: '', mobileNo: '', age: '', businessOrJob: '', dateOfTapConnected: '', meterNo: '', waterCourseName: '', email: '' });
        setOpen(true);
    };

    const handleEditClose = () => {
        setEditConsumer({
            consumerNo: '',
            consumerName: '',
            addressLine1: '',
            addressLine2: '',
            mobileNo: '',
            age: '',
            businessOrJob: '',
            dateOfTapConnected: '',
            meterNo: '',
            waterCourseName: '',
            email: ''
        });
        setOpen(false);
    };

    const handleSave = async () => {
        try {
            if (editConsumer.consumerNo && editConsumer.consumerName) {
                if (editConsumer.id) {
                    // Edit existing consumer
                    await axios.put(`http://localhost:8080/api/consumers/${editConsumer.id}`, editConsumer);
                } else {
                    // Add new consumer
                    await axios.post(`http://localhost:8080/api/consumers`, editConsumer);
                }
                fetchAllConsumers(); // Refresh the consumer list after save
                handleEditClose(); // Close the dialog after save
            } else {
                alert('Consumer No and Consumer Name are required!');
            }
        } catch (err) {
            console.error('Failed to save consumer', err);
        }
    };

    const handleDownload = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/consumers/report', {
                responseType: 'blob', // Important for downloading files
            });
    
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'ConsumerReport.pdf');
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error('Error downloading report:', error);
        }
    };
   
    return (
        <Paper style={{ padding: '2em', margin: '2em auto', maxWidth: '1200px', border: '1px solid #ddd', borderRadius: '8px' }}>
            <Toolbar>
                <Typography variant="h5" align="left" gutterBottom style={{ fontWeight: 'bold' }}>
                    Consumer Report
                </Typography>
                <div style={{ flexGrow: 1 }} />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEditOpen({})}
                    style={{ marginBottom: '1em', marginLeft: '1em' }}
                >
                    Add Consumer
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleDownload}
                    startIcon={<Download />}
                    style={{ marginBottom: '1em', marginLeft: '1em' }}
                >
                    Download Report (PDF)
                </Button>
            </Toolbar>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <TableContainer component={Paper} style={{ border: '1px solid #ccc', borderRadius: '8px', marginTop: '1em', overflowY: 'auto' }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ backgroundColor: '#ffab40', color: 'black' }}  >Consumer No</TableCell>
                            <TableCell style={{ backgroundColor: '#ffab40', color: 'black' }}>Consumer Name</TableCell>
                            <TableCell style={{ backgroundColor: '#ffab40', color: 'black' }}>Address</TableCell>
                            <TableCell style={{ backgroundColor: '#ffab40', color: 'black' }}>Mobile No</TableCell>
                            <TableCell style={{ backgroundColor: '#ffab40', color: 'black' }}>Age</TableCell>
                            <TableCell style={{ backgroundColor: '#ffab40', color: 'black' }}>Business/Job</TableCell>
                            <TableCell style={{ backgroundColor: '#ffab40', color: 'black' }}>Date of Tap Connected</TableCell>
                            <TableCell style={{ backgroundColor: '#ffab40', color: 'black' }}>Meter No</TableCell>
                            <TableCell  style={{ backgroundColor: '#ffab40', color: 'black' }}>Water Course Name</TableCell>
                            <TableCell style={{ backgroundColor: '#ffab40', color: 'black' }}>Email</TableCell>
                            <TableCell  style={{ backgroundColor: '#ffab40', color: 'black' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {consumers && consumers.map((consumer) => (
                            <TableRow key={consumer.id}>
                                <TableCell>{consumer.consumerNo}</TableCell>
                                <TableCell>{consumer.consumerName}</TableCell>
                                <TableCell>{consumer.addressLine1}</TableCell>
                                <TableCell>{consumer.mobileNo}</TableCell>
                                <TableCell>{consumer.age}</TableCell>
                                <TableCell>{consumer.businessOrJob}</TableCell>
                                <TableCell>{consumer.dateOfTapConnected}</TableCell>
                                <TableCell>{consumer.meterNo}</TableCell>
                                <TableCell>{consumer.waterCourseName}</TableCell>
                                <TableCell>{consumer.email}</TableCell>
                                <TableCell>
                                    <IconButton color="primary" onClick={() => handleEditOpen(consumer)}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton color="secondary" onClick={() => deleteConsumer(consumer.id)}>
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={handleEditClose}>
                <DialogTitle>{editConsumer?.id ? 'Edit Consumer' : 'Add Consumer'}</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Consumer No"
                        fullWidth
                        value={editConsumer?.consumerNo || ''}
                        onChange={(e) => setEditConsumer({ ...editConsumer, consumerNo: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Consumer Name"
                        fullWidth
                        value={editConsumer?.consumerName || ''}
                        onChange={(e) => setEditConsumer({ ...editConsumer, consumerName: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Address Line 1"
                        fullWidth
                        value={editConsumer?.addressLine1 || ''}
                        onChange={(e) => setEditConsumer({ ...editConsumer, addressLine1: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Mobile No"
                        fullWidth
                        value={editConsumer?.mobileNo || ''}
                        onChange={(e) => setEditConsumer({ ...editConsumer, mobileNo: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Age"
                        fullWidth
                        value={editConsumer?.age || ''}
                        onChange={(e) => setEditConsumer({ ...editConsumer, age: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Business/Job"
                        fullWidth
                        value={editConsumer?.businessOrJob || ''}
                        onChange={(e) => setEditConsumer({ ...editConsumer, businessOrJob: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Date of Tap Connected"
                        fullWidth
                        value={editConsumer?.dateOfTapConnected || ''}
                        onChange={(e) => setEditConsumer({ ...editConsumer, dateOfTapConnected: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Meter No"
                        fullWidth
                        value={editConsumer?.meterNo || ''}
                        onChange={(e) => setEditConsumer({ ...editConsumer, meterNo: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Water Course Name"
                        fullWidth
                        value={editConsumer?.waterCourseName || ''}
                        onChange={(e) => setEditConsumer({ ...editConsumer, waterCourseName: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Email"
                        fullWidth
                        value={editConsumer?.email || ''}
                        onChange={(e) => setEditConsumer({ ...editConsumer, email: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditClose} color="primary">Cancel</Button>
                    <Button onClick={handleSave} color="primary">Save</Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
};

export default ConsumerReport;
