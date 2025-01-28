import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Container,
    Grid,
    Paper,
    Typography,
    TextField,
    Button,
    FormControlLabel,
    Checkbox,
    Box,
    Link,
    IconButton,
    Stack,
 
} from '@mui/material';
import { Facebook, Google, Twitter } from '@mui/icons-material';
import LanguageIcon from '@mui/icons-material/Language';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import image from '../Assets/Images/leftside.jpg'; // Replace with your actual image path
import logo from '../Assets/Images/logo.png'; // Replace with your actual logo path
import Footer from '../Pages/Footer';
import WaterDropIcon from '@mui/icons-material/WaterDrop'; // Icon for the water logo


const languageFields = {
    English: {
        appTitle: 'Water Management System',
        login: 'Login',
        registerFormTitle: 'Register Form',
        firstName: 'First Name',
        lastName: 'Last Name',
        address: 'Address',
        taluka: 'Taluka',
        district: 'District',
        postalCode: 'Postal Code',
        state: 'State',
        mobileNo: 'Mobile No',
        email: 'Email',
        subscriptionLabel: 'Enable 15 days Free Subscription',
        startDate: 'Start Date',
        endDate: 'End Date',
        register: 'Register',
        alreadyRegistered: 'Do you have already registered? Login',
        footerText: '© 2024 Water Management System'
    },
    Marathi: {
        appTitle: 'पाणी व्यवस्थापन प्रणाली',
        login: 'लॉगिन',
        registerFormTitle: 'नोंदणी फॉर्म',
        firstName: 'पहिलं नाव',
        lastName: 'आडनाव',
        address: 'पत्ता',
        taluka: 'तालुका',
        district: 'जिल्हा',
        postalCode: 'पिन कोड',
        state: 'राज्य',
        mobileNo: 'मोबाइल नंबर',
        email: 'ईमेल',
        subscriptionLabel: '15 दिवसांची मोफत सदस्यता सक्षम करा',
        startDate: 'सुरुवातीची तारीख',
        endDate: 'समाप्ती तारीख',
        register: 'नोंदणी करा',
        alreadyRegistered: 'तुम्ही आधीच नोंदणी केली आहे? लॉगिन करा',
        footerText: '© 2024 पाणी व्यवस्थापन प्रणाली'
    },
};

const RegistrationForm = () => {
    const [Error , setErrors] = useState("");
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        taluka: '',
        district: '',
        postalCode: '',
        state: '',
        mobileNo: '',
        email: '',
        subscription: false,
        startDate: '',
        endDate: '',
        language: 'English',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
    
        // Validation for email
        if (name === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    email: 'Invalid email format.',
                }));
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    email: '',
                }));
            }
        }
    
        // Validation for mobile number
        if (name === 'mobileNo') {
            const mobileRegex = /^\d*$/; // Restrict input to digits only
            if (!mobileRegex.test(value)) {
                return; // Prevent invalid input
            }
    
            if (value.length !== 10) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    mobileNo: 'Mobile number must be exactly 10 digits.',
                }));
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    mobileNo: '',
                }));
            }
        }
    
        // Validation for firstName and lastName
        if (name === 'firstName' || name === 'lastName') {
            const nameRegex = /^[A-Za-z]*$/;
            if (!nameRegex.test(value)) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [name]: 'Only alphabets are allowed.',
                }));
                return; // Prevent invalid input from updating state
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [name]: '',
                }));
            }
        }
    
        // Update form data
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };
    

    const handleLanguageToggle = () => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            language: prevFormData.language === 'English' ? 'Marathi' : 'English',
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            await axios.post('http://localhost:8080/api/registrations', formData);
            alert('Registration successful! Check your email for credentials.');
    
            // Reset the entire form data after successful registration
            setFormData({
                firstName: '',
                lastName: '',
                address: '',
                taluka: '',
                district: '',
                postalCode: '',
                state: '',
                mobileNo: '',
                email: '',
                subscription: false,
                startDate: '',
                endDate: '',
                language: 'English',
            });
        } catch (error) {
            if (error.response) {
                const { status, data } = error.response;
    
                if (status === 409) { // Assuming 409 Conflict for duplicate fields
                    const conflictField = data?.field; // Adjust according to backend error structure
                    let alertMessage = 'This value already exists: ';
    
                    if (conflictField === 'email') {
                        alertMessage += 'Email';
                        setFormData((prevData) => ({ ...prevData, email: '' }));
                    } else if (conflictField === 'mobileNo') {
                        alertMessage += 'Mobile Number';
                        setFormData((prevData) => ({ ...prevData, mobileNo: '' }));
                    }
    
                    alert(alertMessage + '. Please provide a unique value.');
                } else {
                    alert('Error registering, please try again.');
                }
            } else {
                alert('An unexpected error occurred.');
            }
        }
    };

    return (
        <>
            <AppBar position="static" sx={{ bgcolor: '#1976d2' }}>
                <Toolbar>
                    <img src={logo} alt="Logo" style={{ height: '40px', marginRight: '15px' }} />
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        {languageFields[formData.language].appTitle}
                    </Typography>
                    <Button color="inherit" onClick={() => navigate('/login')}>
                        {languageFields[formData.language].login}
                    </Button>
                    <IconButton color="inherit" onClick={handleLanguageToggle}>
                        <LanguageIcon />
                        <Typography variant="body2" sx={{ ml: 1 }}>
                            {formData.language}
                        </Typography>
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Container component="main" maxWidth="lg" sx={{ bgcolor: 'transparent', marginTop: '50px' }}>
                <Grid container spacing={1}>
                    <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                        <Box
                            component="img"
                            src={image}
                            sx={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderRadius: '8px'
                            }}
                        />
                        {/* Overlay for WBMS text and logo */}
       
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper elevation={3} sx={{ padding: 4, borderRadius: '8px', bgcolor: '#FBFBFB' }}>
                            <Typography variant="h5" align="center" color="#332D2D" gutterBottom>
                                {languageFields[formData.language].registerFormTitle}
                            </Typography>
                            <form onSubmit={handleSubmit}>
                                {Object.keys(languageFields[formData.language]).map((fieldKey) => {
                                    const label = languageFields[formData.language][fieldKey];
                                    return (['firstName', 'lastName', 'address', 'taluka', 'district', 'postalCode', 'state', 'mobileNo', 'email', 'startDate', 'endDate'].includes(fieldKey) &&
                                        <TextField
                                            key={fieldKey}
                                            fullWidth
                                            variant="outlined"
                                            label={label}
                                            name={fieldKey}
                                            value={formData[fieldKey]}
                                            onChange={handleChange}
                                            required={['firstName', 'lastName', 'address', 'taluka', 'district', 'postalCode', 'state', 'mobileNo', 'email'].includes(fieldKey)}
                                            type={['startDate', 'endDate'].includes(fieldKey) ? 'date' : 'text'}
                                            InputLabelProps={['startDate', 'endDate'].includes(fieldKey) ? { shrink: true } : {}}
                                            sx={{ marginBottom: 2 }}
                                        />
                                    );
                                })}
                                <FormControlLabel
                                    control={<Checkbox checked={formData.subscription} onChange={handleChange} name="subscription" />}
                                    label={languageFields[formData.language].subscriptionLabel}
                                    sx={{ color: '#332D2D' }}
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    fullWidth
                                    sx={{
                                        mt: 3,
                                        bgcolor: '#1976d2',
                                        '&:hover': {
                                            bgcolor: '#115293',
                                        },
                                        boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
                                    }}
                                >
                                    {languageFields[formData.language].register}
                                </Button>
                            </form>
                            <Stack direction="row" spacing={1} justifyContent="center" sx={{ marginTop: 2 }}>
                                <IconButton aria-label="facebook" size="small">
                                    <Facebook fontSize="inherit" />
                                </IconButton>
                                <IconButton aria-label="google" size="small">
                                    <Google fontSize="inherit" />
                                </IconButton>
                                <IconButton aria-label="twitter" size="small">
                                    <Twitter fontSize="inherit" />
                                </IconButton>
                            </Stack>
                            <Typography variant="body2" align="center" sx={{ mt: 2, color: '#332D2D' }}>
                                <Link href="/login" sx={{ color: '#1976d2' }}>
                                    {languageFields[formData.language].alreadyRegistered}
                                </Link>
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>

            <Footer footerText={languageFields[formData.language].footerText} />
        </>
    );
};

export default RegistrationForm;
