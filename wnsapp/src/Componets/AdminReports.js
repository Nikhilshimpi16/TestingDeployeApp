import React, { useEffect, useState } from 'react';
import {
    Container, Paper, Typography, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, TableSortLabel, Button, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const AdminReports = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/report/registrations');
            setUsers(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching users:', error);
            setError('Failed to fetch users');
            setLoading(false);
        }
    };

    const handleDownload = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/report/downloadReport', { responseType: 'blob' });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'admin_reports.csv');
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error('Error downloading report:', error);
        }
    };

    const handleEditOpen = (user) => {
        setCurrentUser(user);
        setEditDialogOpen(true);
    };

    const handleEditClose = () => {
        setEditDialogOpen(false);
        setCurrentUser(null);
    };

    const handleEditSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`http://localhost:8080/api/report/registration/${currentUser.id}`, currentUser);
            fetchUsers(); // Refresh data
            handleEditClose(); // Close the dialog
        } catch (error) {
            console.error('Error updating user:', error);
            setError('Failed to update user');
        }
    };

    const handleDelete = async (userId) => {
        try {
            await axios.delete(`http://localhost:8080/api/report/registration/${userId}`);
            fetchUsers(); // Refresh data
        } catch (error) {
            console.error('Error deleting user:', error);
            setError('Failed to delete user');
        }
    };

    return (
        <Container
            component="main"
            maxWidth="lg"
            sx={{
                marginTop: '40px',
                marginLeft:'180px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    padding: 4,
                    borderRadius: '12px',
                    width: '100%',
                    maxWidth: '1080px',
                    minHeight: '400px',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                }}
            >
                <Typography
                    variant="h5"
                    align="center"
                    color="#1976d2"
                    fontFamily='poppins'
                    gutterBottom
                    sx={{ fontWeight: 'bold', marginBottom: 1 }}
                >
                    Admin Reports
                </Typography>

                {loading && <Typography>Loading...</Typography>}
                {error && <Typography color="error">{error}</Typography>}
                {!loading && !error && (
                    <>
                        <Button
                            variant="contained"
                            onClick={handleDownload}
                            sx={{
                                mb: 2,
                                bgcolor: '#1976d2',
                                '&:hover': {
                                    bgcolor: '#115293',
                                },
                                alignSelf: 'flex-start',
                            }}
                        >
                            Download Report
                        </Button>

                        <TableContainer
                            sx={{
                                maxHeight: 350,
                                border: '1px solid #ddd',
                                borderRadius: '5px',
                            }}
                        >
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell><TableSortLabel>First Name</TableSortLabel></TableCell>
                                        <TableCell><TableSortLabel>Last Name</TableSortLabel></TableCell>
                                        <TableCell><TableSortLabel>Email</TableSortLabel></TableCell>
                                        <TableCell><TableSortLabel>Mobile No</TableSortLabel></TableCell>
                                        <TableCell><TableSortLabel>Address</TableSortLabel></TableCell>
                                        <TableCell><TableSortLabel>Taluka</TableSortLabel></TableCell>
                                        <TableCell><TableSortLabel>District</TableSortLabel></TableCell>
                                        <TableCell><TableSortLabel>State</TableSortLabel></TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {users.map((user) => (
                                        <TableRow
                                            key={user.id}
                                            sx={{ '&:hover': { backgroundColor: '#f9f9f9' } }}
                                        >
                                            <TableCell>{user.firstName}</TableCell>
                                            <TableCell>{user.lastName}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>{user.mobileNo}</TableCell>
                                            <TableCell>{user.address}</TableCell>
                                            <TableCell>{user.taluka}</TableCell>
                                            <TableCell>{user.district}</TableCell>
                                            <TableCell>{user.state}</TableCell>
                                            <TableCell>
                                                <IconButton onClick={() => handleEditOpen(user)}>
                                                    <EditIcon color="primary" />
                                                </IconButton>
                                                <IconButton onClick={() => handleDelete(user.id)}>
                                                    <DeleteIcon color="error" />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </>
                )}
            </Paper>

            <Dialog
                open={editDialogOpen}
                onClose={handleEditClose}
                maxWidth="sm"
                fullWidth
                sx={{
                    '& .MuiDialog-paper': {
                        borderRadius: '16px',
                        padding: 3,
                        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                    },
                }}
            >
                <DialogTitle>Edit User</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please edit the user's details below.
                    </DialogContentText>
                    {currentUser && (
                        <form onSubmit={handleEditSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="First Name"
                                type="text"
                                fullWidth
                                value={currentUser.firstName}
                                onChange={(e) => setCurrentUser({ ...currentUser, firstName: e.target.value })}
                            />
                            <TextField
                                margin="dense"
                                label="Last Name"
                                type="text"
                                fullWidth
                                value={currentUser.lastName}
                                onChange={(e) => setCurrentUser({ ...currentUser, lastName: e.target.value })}
                            />
                            <TextField
                                margin="dense"
                                label="Email"
                                type="email"
                                fullWidth
                                value={currentUser.email}
                                onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
                            />
                            <TextField
                                margin="dense"
                                label="Mobile No"
                                type="text"
                                fullWidth
                                value={currentUser.mobileNo}
                                onChange={(e) => setCurrentUser({ ...currentUser, mobileNo: e.target.value })}
                            />
                            <TextField
                                margin="dense"
                                label="Address"
                                type="text"
                                fullWidth
                                value={currentUser.address}
                                onChange={(e) => setCurrentUser({ ...currentUser, address: e.target.value })}
                            />
                            <TextField
                                margin="dense"
                                label="Taluka"
                                type="text"
                                fullWidth
                                value={currentUser.taluka}
                                onChange={(e) => setCurrentUser({ ...currentUser, taluka: e.target.value })}
                            />
                            <TextField
                                margin="dense"
                                label="District"
                                type="text"
                                fullWidth
                                value={currentUser.district}
                                onChange={(e) => setCurrentUser({ ...currentUser, district: e.target.value })}
                            />
                            <TextField
                                margin="dense"
                                label="State"
                                type="text"
                                fullWidth
                                value={currentUser.state}
                                onChange={(e) => setCurrentUser({ ...currentUser, state: e.target.value })}
                            />
                            <DialogActions>
                                <Button onClick={handleEditClose} color="primary">
                                    Cancel
                                </Button>
                                <Button type="submit" color="primary">
                                    Save Changes
                                </Button>
                            </DialogActions>
                        </form>
                    )}
                </DialogContent>
            </Dialog>
        </Container>
    );
};

export default AdminReports;
