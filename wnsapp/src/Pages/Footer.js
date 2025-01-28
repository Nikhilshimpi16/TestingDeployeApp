// Footer.js
import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: '#1976d2',
                color: '#FFFFFF',
                py: 2,
                mt: 4,
                textAlign: 'center',
            }}
        >
            <Typography variant="body2">
                © {new Date().getFullYear()} Water Management System. All rights reserved.
            </Typography>
            <Typography variant="body2">
                <Link href="/privacy-policy" color="inherit" underline="hover">
                    Privacy Policy
                </Link>{' '}
                |{' '}
                <Link href="/terms-of-service" color="inherit" underline="hover">
                    Terms of Service
                </Link>
            </Typography>
        </Box>
    );
};

export default Footer;
