// UpdatePassword.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppBar, Toolbar, Typography, Button, TextField, Container, Box, CssBaseline } from '@mui/material';
import { styled } from '@mui/system';
import logo from '../Assets/Images/logo.png'; // Replace with your actual logo path
import waterImage from '../Assets/Images/chnagepassimg.jpg'; // Replace with your actual background image path

// Background container with the water image
const BackgroundContainer = styled(Box)({
    backgroundImage: `url(${waterImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
});

const OverlayBox = styled(Box)({
    backgroundColor: 'rgba(255, 255, 255, 0.85)', // Light overlay for readability
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    fontFamily: 'sans-serif', // Set font family to sans-serif
});

const Title = styled(Typography)({
  fontSize: '1.5rem', // Medium size for the title
  fontFamily: 'sans-serif',
  fontWeight: 'bold',
});

function UpdatePassword() {
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/update-password', {
                email,
                currentPassword,
                newPassword,
            });
            setMessage(response.data); // Success message
            alert("Password updated successfully!");
            navigate('/login'); // Redirect to login after success
        } catch (error) {
            setMessage(error.response?.data || "An error occurred.");
        }
    };

    return (
        <>
            <CssBaseline />
            <BackgroundContainer>
                <Container maxWidth="sm">
                    <OverlayBox>
                        <Box component="form" onSubmit={handleUpdatePassword} sx={{ display: 'flex', flexDirection: 'column', gap: 1, padding: 1, color:'black' }}>
                            <Title align="center" gutterBottom>
                                Update Password
                            </Title>
                            <TextField
                                label="Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                variant="outlined"
                                fullWidth
                                size="medium"
                            />
                            <TextField
                                label="Current Password"
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                required
                                variant="outlined"
                                fullWidth
                                size="medium"
                            />
                            <TextField
                                label="New Password"
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                                variant="outlined"
                                fullWidth
                                size="medium"
                            />
                            <TextField
                                label="Confirm Password"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                variant="outlined"
                                fullWidth
                                size="medium"
                            />
                            <Button type="submit" variant="contained" color="primary" size="large">
                                Update Password
                            </Button>
                            {message && <Typography color="error" align="center" sx={{ marginTop: 2 }}>{message}</Typography>}
                        </Box>
                    </OverlayBox>
                </Container>
            </BackgroundContainer>
        </>
    );
}

export default UpdatePassword;
