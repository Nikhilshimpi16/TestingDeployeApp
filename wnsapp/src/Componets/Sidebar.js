import React from 'react';
import { List, ListItem, ListItemText, ListItemIcon, Box, Typography, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReportIcon from '@mui/icons-material/Assessment';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import WaterDropIcon from '@mui/icons-material/WaterDrop'; // Icon for the water logo

const Sidebar = ({ onSidebarClick }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8080/api/logout');
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
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

      <List sx={{ display: 'flex', flexDirection: 'column', gap: '15px', paddingTop: '10px' }}>
        
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
          <ListItemText primary="Dashboard" />
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
          <ListItemText primary="Admin Reports" />
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
          <ListItemText primary="Logout" />
        </ListItem>
      </List>

      {/* Spacer for bottom padding */}
      <Box sx={{ paddingBottom: '20px' }}></Box>
    </Box>
  );
};

export default Sidebar;
