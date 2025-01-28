import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Card, CardContent, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import EmpBackGround from '../Assets/Images/empBackgroud.jpg'
const EmployeeLogin = () => {
    const [empCode, setEmpCode] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            await axios.post('http://localhost:8080/api/employees/login', null, {
                params: { empCode, password },
            });
            localStorage.setItem('empCode', empCode);
            navigate('/employee-dashboard');
        } catch (error) {
            alert('Invalid credentials!');
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                backgroundImage: `url(${EmpBackGround})`, // Correctly referencing the image
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: 2,
            }}
        >
            <Container maxWidth="sm">
                <Typography
                    variant="h4"
                    component="h1"
                    align="center"
                    gutterBottom
                    sx={{
                        color: '#fff',
                        textShadow: '2px 2px 5px rgba(0, 0, 0, 0.7)',
                        marginBottom: 4,
                         fontFamily: 'Poppins', color: '#ffffff', marginBottom: '2rem'
                    }}
                >
                    Water Billing Management System
                </Typography>
                <Card sx={{ borderRadius: 3, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)' }}>
                    <CardContent>
                        <Typography
                            variant="h5"
                            align="center"
                            gutterBottom
                            sx={{ marginBottom: 2, fontWeight: 'bold', fontFamily:'poppins' }}
                        >
                            Employee Login
                        </Typography>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Employee Code"
                            value={empCode}
                            onChange={(e) => setEmpCode(e.target.value)}
                            variant="outlined"
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            variant="outlined"
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={handleLogin}
                            sx={{
                                marginTop: 3,
                                padding: 1.5,
                                fontWeight: 'bold',
                                fontSize: '16px',
                                backgroundColor: '#1976d2',
                                '&:hover': {
                                    backgroundColor: '#115293',
                                },
                            }}
                        >
                            Login
                        </Button>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
};

export default EmployeeLogin;
