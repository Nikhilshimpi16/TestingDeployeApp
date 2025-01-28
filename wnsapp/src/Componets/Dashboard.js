import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  IconButton,
  Divider,
  useMediaQuery,
  useTheme,
  ListItem,
  ListItemText,
  List,ListItemIcon,
} from '@mui/material';
//import Sidebar from './Sidebar';
import AdminReports from './AdminReports';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../Assets/Images/logo.png';
import MenuIcon from '@mui/icons-material/Menu';
import GroupIcon from '@mui/icons-material/Group';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PublicIcon from '@mui/icons-material/Public';
import waterImage from '../Assets/Images/watermain.jpg';
import WaterDropIcon from '@mui/icons-material/WaterDrop'; // Icon for the water logo
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReportIcon from '@mui/icons-material/Assessment';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState('dashboard');
  const [stats, setStats] = useState({ registrations: 0, activeUsers: 0 });
  const [language, setLanguage] = useState('en');
  const [registrationCount, setRegistrationCount] = useState(0);

  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const translations = {
    en: {
      title: 'Water Billing Management',
      hello: 'Hello, Super Admin',
      registration: 'Registration',
      login: 'Login',
      registrations: 'Registrations',
      activeUsers: 'Active Users',
      reports: 'Admin Reports',
      dashboard: 'Dashboard',
      logout: 'Logout',
      footer: 'All rights reserved',
      welcomeMessage: 'Welcome to Water Billing Management System',
    },
    mr: {
      title: 'पाणी बिल व्यवस्थापन',
      hello: 'नमस्कार, सुपर अॅडमिन',
      registration: 'नोंदणी',
      login: 'लॉगिन',
      registrations: 'नोंदण्या',
      activeUsers: 'सक्रिय वापरकर्ते',
      reports: 'अॅडमिन अहवाल',
      dashboard: 'डॅशबोर्ड',
      logout: 'लॉगआउट',
      footer: 'सर्व हक्क राखीव',
      welcomeMessage: 'पाणी बिल व्यवस्थापन प्रणालीमध्ये स्वागत आहे',
    },
  };
  
  useEffect(() => {
    axios
      .get('http://localhost:8080/api/registrationCount')
      .then((response) => {
        setRegistrationCount(response.data);
      })
      .catch((error) => console.error('Error fetching registration count:', error));
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'mr' : 'en'));
  };

  const onSidebarClick = (page) => {
    setActivePage(page);
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8080/api/logout');
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard':
        return (
          <Box sx={{ display: 'flex', justifyContent: 'left', gap: '20px', marginTop: '10px',marginLeft:'250px' }}>
            <Card sx={{ background: '#ffffff', color: '#00000', width: '500px', height: '70px', display: 'flex', alignItems: 'center', padding: '10px', borderRadius: '5px', boxShadow: 4, transition: '0.5s', '&:hover': { boxShadow: 6 } }}>
              <PersonAddIcon sx={{ fontSize: 40, color: '#ffeb3b', marginRight: '10px' }} />
              <Box>
                <Typography variant="h6" sx={{ fontSize: '0.9rem', fontFamily: 'sans-serif' }}>{translations[language].registrations}</Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold', fontFamily: 'sans-serif' }}>{registrationCount}</Typography>
              </Box>
            </Card>
            <Card sx={{ background: '#ffffff', color: '#00000', width: '500px', height: '70px', display: 'flex', alignItems: 'center', padding: '10px', borderRadius: '5px', boxShadow: 4, transition: '0.5s', '&:hover': { boxShadow: 6 } }}>
              <GroupIcon sx={{ fontSize: 40, color: '#ffeb3b', marginRight: '10px' }} />
              <Box>
                <Typography variant="h6" sx={{ fontSize: '0.9rem', fontFamily: 'sans-serif' }}>{translations[language].activeUsers}</Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold', fontFamily: 'sans-serif' }}>{stats.activeUsers}</Typography>
              </Box>
            </Card>
          </Box>
        );
      case 'reports':
        return <Typography variant="h4"><AdminReports /></Typography>;
     
      default:
        return null;
    }
  };

  return (

    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', overflowX: 'hidden' }}>
  <AppBar position="fixed" sx={{ backgroundColor: '#1a237e' }}>
    <Toolbar sx={{ justifyContent: 'space-between' }}>
      <Box display="flex" alignItems="center">
        <img src={logo} alt="Logo" style={{ width: 40, marginRight: 10 }} />
          <Typography variant="h5" component="div" sx={{ flexGrow: 1,fontFamily:'Poppins',color: '#ffeb3b',fontWeight:'bold'}}>
          {translations[language].title}
        </Typography>
      </Box>

      <Box>
        <Button color="inherit" component={Link} to="/registration">
          {translations[language].registration}
        </Button>
        <Button color="inherit" component={Link} to="/login">
          {translations[language].login}
        </Button>
        <IconButton color="inherit" onClick={toggleLanguage}>
          <PublicIcon />
        </IconButton>
      </Box>
    </Toolbar>
  </AppBar>


//sideabr 
 <Box
      sx={{
        position: 'fixed',
        top: 0,
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: '250px',
        backgroundColor: '#1a237e',
        color: '#fff',
        paddingTop: '80px',
        boxShadow: '2px 0 10px rgba(0, 0, 0, 0.3)', // Shadow effect for the sidebar
      }}
    >
      {/* Logo and Title */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px 0' }}>
        <WaterDropIcon sx={{ fontSize: '40px', color: '#ffeb3b', marginRight: '8px' }} />
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#ffeb3b', fontFamily: 'sans-serif' }}>
          WBMS
        </Typography>
      </Box>

      <Divider sx={{ backgroundColor: '#ffeb3b', margin: '10px 0' }} />
      <List>
  <ListItem
    button
    onClick={() => onSidebarClick('dashboard')}
    sx={{
      '&:hover': { backgroundColor: '#283593', color: '#ffeb3b' },
      paddingLeft: '20px',
    }}
  >
    <ListItemIcon sx={{ color: '#ffeb3b' }}>
      <DashboardIcon />
    </ListItemIcon>
    <ListItemText primary={translations[language].dashboard} />
  </ListItem>

  <ListItem
    button
    onClick={() => onSidebarClick('reports')}
    sx={{
      '&:hover': { backgroundColor: '#283593', color: '#ffeb3b' },
      paddingLeft: '20px',
    }}
  >
    <ListItemIcon sx={{ color: '#ffeb3b' }}>
      <ReportIcon />
    </ListItemIcon>
    <ListItemText primary={translations[language].reports} />
  </ListItem>

  <ListItem
    button
    onClick={handleLogout}
    sx={{
      '&:hover': { backgroundColor: '#283593', color: '#ffeb3b' },
      paddingLeft: '20px',
    }}
  >
    <ListItemIcon sx={{ color: '#ffeb3b' }}>
      <ExitToAppIcon />
    </ListItemIcon>
    <ListItemText primary={translations[language].logout} />
  </ListItem>
</List>

    </Box>
  <Box sx={{ display: 'flex', flexGrow: 1, marginTop: 5, overflowX: 'hidden' }}>
    

    <Box
      sx={{
        flexGrow: 1,
        padding: '20px',
        backgroundColor: '#f0f0f0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <Typography
        variant="h4"
        sx={{ marginBottom: '10px', color: '#333', fontWeight: 'bold', fontFamily:'poppins' , marginLeft:'220px'}}
      >
        {translations[language].welcomeMessage}
      </Typography>
      {renderContent()}
      {activePage === 'dashboard' && (
        <Box
          component="img"
          src={waterImage}
          alt="Water Management"
          sx={{
            marginTop: '20px',
            width: '1090px',
            height: '390px',
            marginLeft:'250px',
            boxShadow: 8,
            objectFit: 'cover',
            transition: 'transform 0.6s ease',
           
          }}
        />
      )}
    </Box>
  </Box>

  <Divider />
  <Box
    component="footer"
    sx={{
      backgroundColor: '#1a237e',
      color: '#fff',
      textAlign: 'center',
      padding: '10px',
    }}
  >
    <Typography variant="body2">
      © 2024 {translations[language].title}. {translations[language].footer}.
    </Typography>
  </Box>
</Box>
  );
};

export default Dashboard;
