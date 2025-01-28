import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    AppBar,
    Toolbar,
    CssBaseline,
} from '@mui/material';
import { styled } from '@mui/system';
import logo from '../Assets/Images/logo.png'; // Replace with your actual logo path
import background from '../Assets/Images/waterImage.png'; // Replace with your actual background image path

// Styled components for custom styles
const AppBarStyled = styled(AppBar)(({ theme }) => ({
    backgroundColor: '#1976d2', // Blue color for the AppBar
}));

const Logo = styled('img')({
    marginRight: '16px',
    height: '40px', // Adjust logo size
});

const FooterStyled = styled('footer')(({ theme }) => ({
    backgroundColor: '#1976d2',
    padding: theme.spacing(2),
    textAlign: 'center',
    color: 'white',
}));

const BackgroundBox = styled(Box)({
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
});

const OverlayBox = styled(Box)({
    backgroundColor: 'rgba(255, 255, 255, 0.85)', // Light overlay for readability
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
});

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await axios.post('http://localhost:8080/api/login', { email, password });
            if (response.data.success) {
                // Save user details in localStorage
                localStorage.setItem('email', response.data.email);
                localStorage.setItem('name', response.data.name);
                localStorage.setItem('avatar', response.data.avatar || ''); // Default to empty if no avatar
                navigate('/admin-dashboard');
            } else {
                setError('Invalid email or password');
            }
        } catch (err) {
            setError('Server error, please try again later');
        }
    };

    return (
        <BackgroundBox>
            {/* AppBar */}
            {/* <AppBarStyled position="static">
                <Toolbar>
                    <Logo src={logo} alt="Logo" />
                    <Typography variant="h6">Water Management System</Typography>
                </Toolbar>
            </AppBarStyled> */}

            {/* Centered System Name */}
            <Typography variant="h3" style={{ fontFamily: 'Poppins', color: '#ffffff', marginBottom: '2rem' }}>
                Water Billing Management System
            </Typography>

            {/* Login Form */}
            <OverlayBox>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Typography component="h1" variant="h5" align="center" gutterBottom>
                        Login Form
                    </Typography>
                    <form onSubmit={handleLogin}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Email Address"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {error && <Typography color="error" variant="body2">{error}</Typography>}
                        <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
                            Login
                        </Button>
                    </form>
                </Container>
            </OverlayBox>

            {/* Footer */}
            {/* <FooterStyled>
                <Typography variant="body2">
                    © 2024 Water Management System - All Rights Reserved
                </Typography>
            </FooterStyled> */}
        </BackgroundBox>
    );
};

export default Login;
