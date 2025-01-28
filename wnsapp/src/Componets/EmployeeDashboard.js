import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItemText,
  CssBaseline,
  Box,
  Divider,
  ListItemButton,
  IconButton,
  Avatar,
  ListItem,
  Button,
} from "@mui/material";
import ConsumerRegistrationForm from "./ConsumerRegistrationForm";
import MeterRegNoForm from "./MeterRegNoForm";
import DepartmentForm from "./DepartmentForm";
import PublicHolidaysForm from "./PublicHolidaysForm";
import WaterBillForm from "./WaterBillForm";
import logo from "../Assets/Images/logo.png";
import PaymentForm from "./PaymentForm";
import LoginIcon from "@mui/icons-material/Login";
import WaterDropIcon from "@mui/icons-material/WaterDrop"
import DashboardIcon from '@mui/icons-material/Dashboard';


import { useNavigate } from "react-router-dom";

const drawerWidth = 240;
const primaryColor = "#1a237e"; // Deep blue color
const textColor = "#ffffff"; // White text

const Dashboard = () => {
  const [assignedForms, setAssignedForms] = useState([]);
  const [activeForm, setActiveForm] = useState("Home"); // Default to Home
  const [error, setError] = useState("");
  const empCode = localStorage.getItem("empCode");
const navigate = useNavigate();
  useEffect(() => {
    const fetchAssignedForms = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/user-rights/${empCode}`
        );
        if (response.data && response.data.rights) {
          const formNameMapping = {
            ConsumerForm: "ConsumerRegistrationForm",
            MeterRegNoForm: "meterRegNoForm",
            DepartmentForm: "DepartmentForm",
            PublicHolidays: "PublicHolidaysForm",
            WaterBill: "WaterBillForm",
            PaymentForm:"paymentForm"
          };
          const normalizedRights = response.data.rights.map((right) =>
            right.replace(/\s/g, "")  // if pass the diffenrt type format the Data in DB so Use this code
            
          );
          setAssignedForms(normalizedRights);
        } else {
          setAssignedForms([]);
          setError("No forms assigned for this employee.");
        }
      } catch (err) {
        console.error("Error fetching assigned forms:", err.message);
        setError("Failed to load assigned forms.");
      }
    };
  
    if (empCode) fetchAssignedForms();
  }, [empCode]);
  
  

  // Map form names to components
  const formComponents = {
    Home: () => (
      <Box
      sx={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        variant="h6"
        align="center"
        sx={{
          fontFamily: "Poppins",
          fontWeight: "bold",
          marginBottom: 2,
        }}
      >
        Welcome to the Employee Dashboard
      </Typography>
      {/* <img
       src={require("../Assets/Images/water.jpg")} // Replace with your image path
        alt="Welcome"
        style={{
          width: "100%", // Adjust the size as needed
          maxWidth: "500px", // Make it responsive
          borderRadius: "10px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      /> */}
    </Box>
      
    ),
    ConsumerRegistrationForm: ConsumerRegistrationForm,
    MeterRegNoForm: MeterRegNoForm,
    DepartmentForm: DepartmentForm,
    PublicHolidaysForm: PublicHolidaysForm,
    WaterBillForm: WaterBillForm,
    PaymentForm:PaymentForm
  };


  // Render the active form
  const renderActiveForm = () => {
    const ActiveFormComponent = formComponents[activeForm];
    return ActiveFormComponent ? <ActiveFormComponent /> : <Typography>Form not found.</Typography>;
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <CssBaseline />
      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: primaryColor,
        }}
      >
        <Toolbar>
          <Avatar src={logo} alt="Logo" sx={{ marginRight: "15px" }} />
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{
              color: textColor,
              fontWeight: "bold",
              letterSpacing: 1,
              fontFamily: "Poppins",
              color: '#ffeb3b',
              flexGrow: 1, // Push the button to the right
            }}
          >
            Water Billing Management
          </Typography>
          {/* EMP-Login Button */}
          <Button
            variant="contained"
            color="secondary"
            startIcon={<LoginIcon />}
            sx={{
              backgroundColor: "#ff5722", // Orange button color
              color: textColor,
              fontWeight: "bold",
              textTransform: "none",
              fontFamily: "Poppins",
              "&:hover": {
                backgroundColor: "#e64a19", // Darker shade on hover
              },
            }}
            onClick={()=> navigate("/employee-login")}
          >
            EMP-Login
          </Button>
        </Toolbar>

      </AppBar>

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: primaryColor,
            color: textColor,
          },
        }}
      >
        <Toolbar />
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", paddingTop: "30px" }}>
            <WaterDropIcon sx={{ fontSize: "40px", color: "#ffeb3b", marginRight: "10px" }} />
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "#ffeb3b", fontFamily: "sans-serif" }}
            >
              WBMS
            </Typography>
          </Box>
          <Divider sx={{ backgroundColor: "#ffeb3b", margin: "10px 0" }} />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {/* Home item */}
            <ListItemButton
              onClick={() => setActiveForm("Home")}
              sx={{ "&:hover": { backgroundColor: "#283593" }, color: textColor, paddingLeft: '20px' ,color: '#ffeb3b',fontWeight:'600'}}
            >         
               <DashboardIcon />
              <ListItemText primary= " Emp-Dashboard" />
            </ListItemButton>
           
            {/* Dynamically render assigned forms */}
            {assignedForms.map((form, index) => (
              <ListItemButton
                key={index}
                onClick={() => setActiveForm(form)}
                sx={{ "&:hover": { backgroundColor: "#283593" }, color: textColor }}
              >
                <ListItemText primary={form} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>

     {/* Main Content */}
<Box
  component="main"
  sx={{
    flexGrow: 1,
    backgroundColor: "#ffffff",
    padding: 3,
    height: "100vh", // Ensures the content fills the viewport height
    overflowY: "auto", // Allows scrolling if the content overflows
  }}
>
  <Box
    sx={{
      margin: "0 auto", // Centers the content horizontally
      padding: 7,
      backgroundColor: "#ffffff",
      borderRadius: 2,
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      maxWidth: "90%", // Makes it responsive by capping the width
      minWidth: 300, // Ensures a minimum width for smaller screens
    }}
  >
    {renderActiveForm()}
  </Box>
</Box>

    </Box>
  );
};

export default Dashboard;
