import React, { useState, useEffect } from 'react';
import {
    Button,
    TextField,
    Grid,
    Typography,
    Container,
    Card,
    CardContent,
    Box,
    Autocomplete,
    Divider,
    Alert,
    Snackbar
} from '@mui/material';
import axios from 'axios';

const ConsumerRegistrationForm = () => {
    const [formData, setFormData] = useState({
        consumerNo: '',
        consumerName: '',
        addressLine1: '',
        addressLine2: '',
        mobileNo: '',
        age: '',
        state:'',
        businessOrJob: '',
        dateOfTapConnected: '',
        meterNo: '',
        waterCourseName: '',
        email: '',
    });
    const [meters, setMeters] = useState([]);
    const [usedMeters, setUsedMeters] = useState([]);
    const [states] = useState([
        'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 
        'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 
        'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 
        'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 
        'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 
        'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands', 
        'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 
        'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
    ]);

    const [language, setLanguage] = useState('en'); // 'en' for English, 'mr' for Marathi
    const [errorMessage, setErrorMessage] = useState('');
    const [openAlert, setOpenAlert] = useState(false);

    useEffect(() => {
        fetchMeterNos();
        fetchConsumerNo();
    }, []);

    const toggleLanguage = (event) => {
        setLanguage(event.target.checked ? 'mr' : 'en');
    };

    const fetchMeterNos = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/meter-register');
            setMeters(response.data || []);
        } catch (error) {
            console.error('Error fetching meters:', error);
        }
    };

    const fetchConsumerNo = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/consumers/generate-number');
            setFormData((prev) => ({
                ...prev,
                consumerNo: response.data,
            }));
        } catch (error) {
            console.error('Error generating new consumer number:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleMeterSelect = (event, value) => {
        setFormData({ ...formData, meterNo: value || '' });
    };

    const handleAutocompleteChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {

        // Clear previous error messages and alert
    setErrorMessage('');
    setOpenAlert(false);
        // Form validation
        const requiredFields = [
            'consumerName', 'addressLine1', 'mobileNo', 'age', 'businessOrJob', 
            'dateOfTapConnected', 'meterNo', 'waterCourseName', 'email'
        ];
        // for (let field of requiredFields) {
        //     if (!formData[field]) {
        //         setErrorMessage('Please fill all required fields.');
        //         setOpenAlert(true);
                
        //         return;
        //     }
        // }

        try {
            await axios.post('http://localhost:8080/api/consumers', formData);
            alert('Consumer registered successfully');

            // Update used meters and remove from available meters
            setUsedMeters((prev) => [...prev, formData.meterNo]);
            setMeters((prev) => prev.filter((meter) => meter.meterNo !== formData.meterNo));
            fetchConsumerNo();
            setFormData({
                consumerNo: '',
                consumerName: '',
                addressLine1: '',
                addressLine2: '',
                mobileNo: '',
                age: '',
                state:'',
                businessOrJob: '',
                dateOfTapConnected: '',
                meterNo: '',
                waterCourseName: '',
                email: '',
            });
    
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleCloseAlert = () => {
        setOpenAlert(false);
    };

    return (
        <Container maxWidth="md" sx={{ padding: '2rem 0' }}>
            <Card sx={{ boxShadow: 4, borderRadius: 2, overflow: 'hidden' }}>
                <Box sx={{ backgroundColor: '#1976d2', padding: 1 }}>
                    <Typography
                        variant="h6"
                        align="center"
                        sx={{ color: '#fff', fontWeight: 'bold', textTransform: 'uppercase' }}
                    >
                        Consumer Registration
                    </Typography>
                </Box>
                <CardContent sx={{ padding: 4 }}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
                        Consumer Information
                    </Typography>
                    <Divider sx={{ marginBottom: 3 }} />
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Consumer No"
                                variant="outlined"
                                fullWidth
                                disabled
                                name="consumerNo"
                                value={formData.consumerNo}
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Consumer Name"
                                variant="outlined"
                                fullWidth
                                name="consumerName"
                                value={formData.consumerName}
                                onChange={handleInputChange}
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Address"
                                variant="outlined"
                                fullWidth
                                name="addressLine1"
                                value={formData.addressLine1}
                                onChange={handleInputChange}
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="City"
                                variant="outlined"
                                fullWidth
                                name="addressLine2"
                                value={formData.addressLine2}
                                onChange={handleInputChange}
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Autocomplete
                                options={states}
                                value={formData.state}
                                onChange={(event, value) => handleAutocompleteChange('state', value)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="State"
                                        variant="outlined"
                                        fullWidth
                                        size="small"
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Mobile No"
                                variant="outlined"
                                fullWidth
                                name="mobileNo"
                                value={formData.mobileNo}
                                onChange={handleInputChange}
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Age"
                                variant="outlined"
                                fullWidth
                                name="age"
                                value={formData.age}
                                onChange={handleInputChange}
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Business/Job"
                                variant="outlined"
                                fullWidth
                                name="businessOrJob"
                                value={formData.businessOrJob}
                                onChange={handleInputChange}
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Date of Tap Connection"
                                variant="outlined"
                                fullWidth
                                type="date"
                                name="dateOfTapConnected"
                                value={formData.dateOfTapConnected}
                                onChange={handleInputChange}
                                InputLabelProps={{ shrink: true }}
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Autocomplete
                                options={meters.map((meter) => meter.meterNo)}
                                value={formData.meterNo}
                                onChange={handleMeterSelect}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Meter No"
                                        variant="outlined"
                                        fullWidth
                                        size="small"
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Water Course Name"
                                variant="outlined"
                                fullWidth
                                name="waterCourseName"
                                value={formData.waterCourseName}
                                onChange={handleInputChange}
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Email"
                                variant="outlined"
                                fullWidth
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                size="small"
                            />
                        </Grid>
                    </Grid>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 3 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                            size="large"
                            sx={{ fontWeight: 'bold' }}
                        >
                            Register
                        </Button>
                    </Box>

                    {/* Snackbar for Alert Message */}
                    <Snackbar
                        open={openAlert}
                        autoHideDuration={4000}
                        onClose={handleCloseAlert}
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Positioning the Snackbar
                    >
                        <Alert severity="error" onClose={handleCloseAlert}>
                            {errorMessage}
                        </Alert>
                    </Snackbar>
                </CardContent>
            </Card>
        </Container>
    );
};

export default ConsumerRegistrationForm;
