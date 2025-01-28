import React, { useState, useEffect } from 'react';
import { Container, TextField, Typography, Button, Paper, Box } from '@mui/material';
import axios from 'axios';

const MeterRateForm = () => {
    const [unit, setUnit] = useState('1'); // Default unit value
    const [price, setPrice] = useState('');
    const [isEditing, setIsEditing] = useState(false); // Track if the form is in edit mode
    const [rateId, setRateId] = useState(null); // Track the rate ID if it's an existing rate

    // Fetch the existing rate if available
    useEffect(() => {
        const fetchRate = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/meter-rate/latest'); // Fetch the rate from backend
                if (response.data) {
                    setPrice(response.data.price);
                    setRateId(response.data.id); // Store the rate ID
                }
            } catch (error) {
                console.error('Error fetching meter rate:', error);
            }
        };
        fetchRate();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!price) {
            alert('Please fill in the price per unit.');
            return;
        }

        try {
            if (isEditing && rateId) {
                // Update existing rate
                await axios.put(`http://localhost:8080/api/meter-rate/${rateId}`, { unit, price });
                alert('Meter rate updated successfully');
            } else {
                // Save new rate
                await axios.post('http://localhost:8080/api/meter-rate', { unit, price });
                alert('Meter rate saved successfully');
            }
            setIsEditing(false); // Exit edit mode after saving
        } catch (error) {
            console.error('Error saving/updating meter rate:', error);
        }
    };

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    return (
        <Container maxWidth="sm" sx={{ marginTop: 4 }}>
            <Paper elevation={3} sx={{ padding: 4 }}>
                <Typography variant="h5" align="center" sx={{ fontWeight: 'bold', marginBottom: 3 }}>
                    Meter Rate Form
                </Typography>
                <form onSubmit={handleSubmit}>
                   <TextField
                        fullWidth
                        label="Unit"
                        variant="outlined"
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)} // Allow editing unit
                        disabled={!isEditing} // Allow editing only when in edit mode
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Price per Unit (₹)"
                        variant="outlined"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        type="number"
                        sx={{ marginBottom: 2 }}
                        disabled={!isEditing} // Allow editing only when in edit mode
                    />
                    <Box display="flex" justifyContent="space-between">
                        <Button variant="contained" color="primary" type="submit">
                            {isEditing ? 'Update' : 'Save'}
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={toggleEdit}>
                            {isEditing ? 'Cancel Edit' : 'Edit'}
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Container>
    );
};

export default MeterRateForm;
