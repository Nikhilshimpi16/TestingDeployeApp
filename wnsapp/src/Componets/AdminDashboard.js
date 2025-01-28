import React, { useState, useEffect } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    LineChart, Line
  } from 'recharts';
import {
    AppBar,
    Toolbar,
    Typography,
    CssBaseline,
    Box,
    Container,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    Menu,
    MenuItem,
    Avatar,
    Collapse,
    IconButton,
    Button,
    Grid,
    Card,
    CardContent,
} from '@mui/material';
import { fontFamily, styled } from '@mui/system';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import GroupIcon from '@mui/icons-material/Group';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonIcon from '@mui/icons-material/Person';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LanguageIcon from '@mui/icons-material/Language';
import logo from '../Assets/Images/logo.png';
import dashboardImage from '../Assets/Images/waterImagee.jpg';
import axios from 'axios';
import EmployeeForm from './EmployeeForm';
import DepartmentForm from './DepartmentForm';
import LeaveTypeForm from './LeaveTypeForm';
import PublicHolidaysForm from './PublicHolidaysForm';
import { useNavigate } from 'react-router-dom';
import MeterRegNoForm from './MeterRegNoForm';
import MeterRateForm from './MeterRateForm';
import ConsumerRegistrationForm from './ConsumerRegistrationForm';
import EmployeeReport from './EmployeeReport';
import ConsumerReport from './ConsumerReport';
import UpdatePassword from './updatePassword'; // Import ChangePassword component
import Logout from './Logout'; // Import Logout component
import PaymentForm from './PaymentForm';
import WaterBillForm from './WaterBillForm';
import PaymentReports from './PaidPaymentReports';
import PaymentReportsDateWise from './PaymentReportsDateWise';
import WaterBillSearch from './WaterBillSearch';
import { People, Water, AttachMoney, NoteAdd, Speed, TaskAlt, TrendingUp } from '@mui/icons-material';
import FinancialYearWiseBillReport from './FinancialYearWiseBillReport';
import UserRights from './UserRights';






// Styled components
const Sidebar = styled(Box)({
  width: '240px',
  height: '100vh',
  backgroundColor: '#1a237e',
  color: 'white',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: '60px',
  position: 'fixed',
  overflowX: 'auto', // Enable horizontal scrolling
  whiteSpace: 'wrap', // Ensure content stays in a single line for horizontal scrolling
});

// Styling for List Items with hover effect
const StyledListItem = styled(ListItem)({
  '&:hover': {
      backgroundColor: '#1a237e', // Hover color
      transition: 'background-color 0.5s ease', // Smooth transition
  },
});
const AppBarStyled = styled(AppBar)({
    zIndex: 1201,
    backgroundColor: '#1a237e',
});

const Footer = styled(Box)({
    backgroundColor: '#1a237e',
    color: 'white',
    textAlign: 'center',
    padding: '16px 0',
    marginTop: 'auto',
    width: '100%',
    position: 'relative'
});
const MainContainer = styled(Box)({
    marginLeft: '240px', // Sidebar width offset
   // marginTop: '54px', // AppBar height offset
   padding: '26px',
    overflow: 'hidden',
    // height: 'calc(100vh - 64px)', // To make sure it fills the remaining screen height
});

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];


  
const AdminDashboard = () => {
    const [masterFormOpen, setMasterFormOpen] = useState(false);
    const [BillingFormOpen, setBillingFormOpen] = useState(false);
    const [reportsOpen, setReportsOpen] = useState(false); // New state for "Reports" dropdown
    const [language, setLanguage] = useState('en');
    const [activeForm, setActiveForm] = useState('dashboard'); // Track active form
    const [settingsOpen, setSettingsOpen] = useState(false); // State for Settings section
    const navigate = useNavigate();
    const name = localStorage.getItem('name');



//Counting logic on admin Dashboard
    const [dashboardData, setDashboardData] = useState({
        totalBilling: 0,
        consumers: 0,
        receivedAmount: 0,  // default value
       pendingAmounts: 0,
      });

 // Card Data 
 const cardsData = [
    {
        title: 'Consumers',
        value: dashboardData.consumers,
        icon: <People />,
        bgColor: '#4CAF50', // Subtle green for success/engagement
    },
    {
        title: 'Total Billing',
        value: dashboardData.totalBilling,
        icon: <Water />,
        bgColor: '#03A9F4', // Soft blue for water/technology
    },
    {
        title: 'Received Amount',
        value: dashboardData.receivedAmount,
        icon: <AttachMoney />,
        bgColor: '#FF9800', // Orange for urgency/finance
    },
    {
        title: 'Pending Amounts',
        value: dashboardData.pendingAmounts,
        icon: <NoteAdd />,
        bgColor: '#673AB7', // Purple for creativity/growth
    },
];

// Graph Data
const chartData = [
{ name: 'Consumers', value: dashboardData.consumers, color: '#4CAF50' },
{ name: 'Total Billing', value: dashboardData.totalBilling, color: '#03A9F4' },
{ name: 'Received Amount', value: dashboardData.receivedAmount, color: '#FF9800' },
{ name: 'Pending Amounts', value: dashboardData.pendingAmounts, color: '#673AB7' },
];


      useEffect(() => {
        // Fetch data from the backend
        axios.get('http://localhost:8080/api/dashboard/consumer-count')
          .then(response => {
            setDashboardData(prevState => ({
              ...prevState,
              consumers: response.data,
            }));
          });
    
      }, []);


      useEffect(() => {
        // Fetch the total bill amount
        axios
          .get('http://localhost:8080/api/bills/totalBillAmount') 
           // Replace with the correct API endpoint
          .then(response => {
            console.log('totalBilling  Response:', response); // Log the response to check its structure

            setDashboardData(prevState => ({
              ...prevState,
              totalBilling: response.data, // Store the total billing amount in state
              
              
            }));
          })
          .catch(error => {
            console.error('Error fetching total bill amount:', error);
          });         
    }, []); 

    useEffect(() => {
        // Fetch both unpaid and paid total amounts in parallel
        const fetchAmounts = async () => {
          try {
            // Fetch unpaid amount (pending amount)
            const unpaidResponse = await axios.get('http://localhost:8080/api/reports/unpaid-total');
            console.log('Unpaid Response:', unpaidResponse); // Log the response to check its structure

            const unpaidAmount = unpaidResponse.data ?? 0; // Default to 0 if response is null or undefined
    
            // Fetch paid amount (received amount)
            const paidResponse = await axios.get('http://localhost:8080/api/reports/paid-total');
            console.log('Paid Response:', paidResponse); // Log the response to check its structure

            const paidAmount = paidResponse.data ?? 0; // Default to 0 if response is null or undefined
    
            // Update state with both values
            setDashboardData({
              receivedAmount: paidAmount,
              pendingAmounts: unpaidAmount,
            });
    
          } catch (error) {
            console.error('Error fetching amounts:', error);
          }
        };
    
        fetchAmounts();
      }, []); 

   
    // Translations for English and Marathi
    const translations = {
        en: {
            title: "Water Billing Management",
           // hello: "Hello, Super Admin",
            Dashboard: "Dashboard",
            login: "Login",
            MasterForm: "Master Form",
            activeUsers: "Active Users",
            EmployeeRegistrion: "Employee Registration",
            Department: "Department",
            // LeaveType: "Leave Type",
            PublicHolidays: "Public Holidays",
            MeterRegNoForm: 'Meter Registration Number Form',
            MeterRateForm: 'Meter Rate Form',
            reports: "Reports",
            footer: "All rights reserved. Water Billing Management System © 2024",
            welcomeMessage: "Welcome to Water Billing Management System",
            ConsumerRegistrationForm: "Consumer Registration", 
            BillingManagement:"BillingManagment",
            WaterBillForm:"WaterBillForm",
            PaymentForm:"PaymentForm", 
            EmployeeReport: "EmployeeReport",
            ConsumerReport: "ConsumerReport ",
            PaidPaymentReports:"PaymentReport",
            PaymentReportsDateWise:"PaymentReportDateWise",
            WaterBillSearch:"WaterBillReport",
            FinancialYearWiseBillReport:'FinancialYearReport',
            UserRights: "User Rights Management",
            Settings: "Settings",
            UpdatePassword: "ChangePassword",
            Logout: "Logout",
            consumers:"consumers",
            totalBilling:"totalBilling",
            receivedAmount:"ReceviedAmount",
            pendingAmounts:"PendingAmounts",
            hello: "name",
            welcome: "Welcome",
        },
        mr: {
            title: "पाणी बिल व्यवस्थापन",
          //  hello: "नमस्कार, सुपर अॅडमिन",
            Dashboard: "डॅशबोर्ड",
            login: "लॉगिन",
            MasterForm: "मास्टर फॉर्म",
            activeUsers: "सक्रिय वापरकर्ते",
            EmployeeRegistrion: "कर्मचारी नोंदणी",
            Department: "विभाग",
            // LeaveType: "रजा प्रकार",
            PublicHolidays: "सार्वजनिक सुट्ट्या",
            MeterRegNoForm: 'मीटर क्रमांक नोंदणी',
            MeterRateForm: 'मीटर दर',
            reports: "अहवाल",
            footer: "सर्व हक्क राखीव. पाणी बिल व्यवस्थापन प्रणाली © 2024",
            welcomeMessage: "पाणी बिल व्यवस्थापन प्रणालीमध्ये स्वागत आहे",
            ConsumerRegistrationForm: "नवीन ग्राहक नोंदणी",
            BillingManagement:"बिलिंग व्यवस्थापन",
            WaterBillForm:"पाणी बिल फॉर्म",
            PaymentForm:"पेमेंट फॉर्म",
            EmployeeReport: "कर्मचारी अहवाल ",
            ConsumerReport: "ग्राहक अहवाल ", 
            PaidPaymentReports:"पेमेंट अहवाल",
            PaymentReportsDateWise:"पेमेंट अहवाल तारखेनुसार",
            WaterBillSearch:"पाणी बिल शोधा",
            FinancialYearWiseBillReport:'आर्थिक वर्षानुसार अहवाल',
            UserRights: "वापरकर्ता हक्क व्यवस्थापन",
            Settings: "सेटिंग्ज",
            ChangePassword: "पासवर्ड बदला",
            Logout: "लॉगआउट",
            consumers:"ग्राहक",
            totalBilling:"एकूण बिलिंग",
            receivedAmount:"मिळालेली रक्कम",
            pendingAmounts:"प्रलंबित रक्कम",
            hello:'नाव',
            welcome:'नमस्कार'
        },
    }; 
   

    const handleLogout = () => {
        localStorage.clear();
        navigate('/'); // Redirect to login
    };
    const handleMasterFormClick = () => {
        setMasterFormOpen(!masterFormOpen);
    };
    const handleBillingFormClick = () => {
        setBillingFormOpen(!BillingFormOpen);
    };

    const handleReportsClick = () => { // Function to toggle Reports dropdown
        setReportsOpen(!reportsOpen);
    };

    const handleSettingsClick = () => {
        setSettingsOpen(!settingsOpen);
    };
    const handleLanguageToggle = () => {
        setLanguage((prevLanguage) => (prevLanguage === 'en' ? 'mr' : 'en'));
    };

    // Function to display the correct form in the dashboard area
    const displayContent = () => {
        switch (activeForm) {
            case 'employeeRegistration':
                return <EmployeeForm />;
            case 'department':
                return <DepartmentForm />;
            // case 'leaveType':
            //     return <LeaveTypeForm />;
            case 'publicHolidays':
                return <PublicHolidaysForm />;
            case 'meterRegNoForm': // corrected form name
                return <MeterRegNoForm />;
            case 'meterRateForm':
                return <MeterRateForm />;
            case 'ConsumerRegistrationForm':
                return <ConsumerRegistrationForm />;
            case 'EmployeeReport':
                return <Typography variant="h6"><EmployeeReport/></Typography>;
            case 'ConsumerReport':
                return <Typography variant="h6"><ConsumerReport/></Typography>;
            case 'ChangePassword':
                    return <UpdatePassword />;
            case 'Logout':
                    return <Logout />;
            case 'WaterBill':
                    return <WaterBillForm />;
            case 'PaymentForm':
                    return <PaymentForm />;
             case 'PaymentReport':
                        return <PaymentReports />;
             case 'PaymentReportDateWise':
                        return <PaymentReportsDateWise />;
             case 'WaterBillReport':
                        return <WaterBillSearch />;
             case 'YearReport':
                         return <FinancialYearWiseBillReport />;
             case 'UserRights':
                          return <UserRights/>;
            default:
  
  return (
<Box sx={{ padding: '16px', backgroundColor: '#f4f6f8', minHeight: '100vh' }}> 
     {/* Cards Section */}
<Grid container spacing={3} justifyContent="center">
  {cardsData.map((card, index) => (
    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
      <Card
        sx={{
          borderRadius: '10px', // Rounded corners for a smooth look
         
          backgroundColor: '#f9f9f9', // Faint background color for the card
          color: '#000', // Text color black for better contrast
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
          transition: 'transform 0.3s, box-shadow 0.3s',
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
          },
        }}
      >
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '24px',
            
          }}
        >
          {/* Icon Section with Faint Background Color */}
          <Box
            sx={{
              width: 50,
              height: 50,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '50%',
              backgroundColor: card.bgColor, // Faint color based on card.bgColor
              marginBottom: '16px',
            }}
          >
            <Avatar
              sx={{
                backgroundColor: 'transparent',
                color: '#fff',
                fontSize: '30px', // Larger icon size
              }}
            >
              {card.icon}
            </Avatar>
          </Box>

          {/* Title and Value */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              fontSize: '16px', // Title font size
              fontFamily: 'Poppins, sans-serif',
              color: '#444', // Darker color for the title
              marginBottom: '8px',
            }}
          >
            {card.title}
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              fontSize: '20px', // Value font size
              fontFamily: 'Poppins, sans-serif',
              color: '#222', // Darker color for the value
            }}
          >
            {card.value}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  ))}
</Grid>



<div style={{
      width: '100%',
      height: '500px',
      marginTop: '40px',
      background: 'linear-gradient(to right, #f5f5f5, #ffffff)',
      padding: '30px',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    }}>
      <h3
        style={{
          textAlign: 'center',
          fontFamily: 'Poppins, sans-serif',
          fontSize: '24px',
          fontWeight: '700',
          color: '#333',
          marginBottom: '30px',
        }}
      >
        Dashboard Overview
      </h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={chartData}
          margin={{ top: 30, right: 20, left: 20, bottom: 30 }}
        >
          {/* Add a subtle background grid */}
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />

          {/* Customizing the X-Axis with cleaner ticks and labels */}
          <XAxis
            dataKey="name"
            tick={{ fontSize: 14, fontFamily: 'Poppins, sans-serif', fill: '#666' }}
            tickLine={false}
            axisLine={{ stroke: '#ccc', strokeWidth: 1 }}
            tickFormatter={(value) => value.charAt(0).toUpperCase() + value.slice(1)}
          />

          {/* Customizing the Y-Axis */}
          <YAxis
            tick={{ fontSize: 14, fontFamily: 'Poppins, sans-serif', fill: '#666' }}
            tickLine={false}
            axisLine={{ stroke: '#ccc', strokeWidth: 1 }}
          />

          {/* Tooltip with more style and clarity */}
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              borderRadius: '8px',
              padding: '10px',
              border: '1px solid #ddd',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
              fontSize: '14px',
              fontFamily: 'Poppins, sans-serif',
            }}
            itemStyle={{ color: '#333' }}
            cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }}
          />

          {/* Legend with a cleaner design */}
          <Legend
            wrapperStyle={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '14px',
              fontWeight: '500',
              marginTop: '20px',
            }}
          />

          {/* Adding lines with smooth curves and animations */}
          {chartData.map((entry, index) => (
            <Line
              key={index}
              type="monotone"
              dataKey="value"
              name={entry.name}
              stroke={entry.color}
              strokeWidth={3}
              dot={{ r: 5, fill: entry.color, stroke: '#fff', strokeWidth: 2 }}
              activeDot={{ r: 8 }}
              animationDuration={1000}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>

     </Box>
  )};
}
        
    

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <CssBaseline />

            {/* Sidebar */}
            <Sidebar>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '30px' }}>
                    <WaterDropIcon sx={{ fontSize: '40px', color: '#ffeb3b', marginRight: '10px' }} />
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#ffeb3b', fontFamily: 'sans-serif' }}>
                        WBMS
                    </Typography>
                </Box>

                <Divider sx={{ backgroundColor: '#ffeb3b', margin: '10px 0' }} />

                <List sx={{ display: 'flex', flexDirection: 'column', gap: '15px', paddingTop: '10px' }}>
                    <ListItem button onClick={() => setActiveForm('dashboard')}>
                        <ListItemIcon>
                            <DashboardIcon style={{ color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText primary={translations[language].Dashboard} />
                    </ListItem>

                    <ListItem button onClick={handleMasterFormClick}>
                        <ListItemIcon>
                            <GroupIcon style={{ color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText primary={translations[language].MasterForm} />
                        {masterFormOpen ? <ExpandLessIcon style={{ color: 'white' }} /> : <ExpandMoreIcon style={{ color: 'white' }} />}
                    </ListItem>

                    <Collapse in={masterFormOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding sx={{ paddingLeft: 4 }}>
                            <ListItem button onClick={() => setActiveForm('employeeRegistration')}>
                                <ListItemText primary={translations[language].EmployeeRegistrion} />
                            </ListItem>
                            <ListItem button onClick={() => setActiveForm('department')}>
                                <ListItemText primary={translations[language].Department} />
                            </ListItem>
                            {/* <ListItem button onClick={() => setActiveForm('leaveType')}>
                                <ListItemText primary={translations[language].LeaveType} />
                            </ListItem> */}
                            <ListItem button onClick={() => setActiveForm('publicHolidays')}>
                                <ListItemText primary={translations[language].PublicHolidays} />
                            </ListItem>
                            <ListItem button onClick={() => setActiveForm('meterRegNoForm')}>
                                <ListItemText primary={translations[language].MeterRegNoForm} />
                            </ListItem>
                            <ListItem button onClick={() => setActiveForm('meterRateForm')}>
                                <ListItemText primary={translations[language].MeterRateForm} />
                            </ListItem>
                        </List>
                    </Collapse>

                    <ListItem button onClick={() => setActiveForm('ConsumerRegistrationForm')}>
                        <ListItemIcon>
                            <PersonAddIcon style={{ color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText primary={translations[language].ConsumerRegistrationForm} />
                    </ListItem>

                   {/* Billing Section */}
                    <ListItem button onClick={handleBillingFormClick}>
                        <ListItemIcon>
                            <AccountBalanceIcon style={{ color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText primary={translations[language].BillingManagement} />
                        {BillingFormOpen ? <ExpandLessIcon style={{ color: 'white' }} /> : <ExpandMoreIcon style={{ color: 'white' }} />}
                    </ListItem>

                    <Collapse in={BillingFormOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding sx={{ paddingLeft: 4 }}>
                            <ListItem button onClick={() => setActiveForm('WaterBill')}>
                                <ListItemText primary={translations[language].WaterBillForm} />
                            </ListItem>
                            <ListItem button onClick={() => setActiveForm('PaymentForm')}>
                                <ListItemText primary={translations[language].PaymentForm} />
                            </ListItem>
                        </List>
                    </Collapse>

                    <ListItem button onClick={() => setActiveForm('UserRights')}>
                        <ListItemIcon>
                            <PersonIcon style={{ color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText primary={translations[language].UserRights} />
                    </ListItem>

                    {/* Reports Section */}
                    <ListItem button onClick={handleReportsClick}>
                        <ListItemIcon>
                            <AssignmentIcon style={{ color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText primary={translations[language].reports} />
                        {reportsOpen ? <ExpandLessIcon style={{ color: 'white' }} /> : <ExpandMoreIcon style={{ color: 'white' }} />}
                    </ListItem>

                    <Collapse in={reportsOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding sx={{ paddingLeft: 4 }}>
                            <ListItem button onClick={() => setActiveForm('EmployeeReport')}>
                                <ListItemText primary={translations[language].EmployeeReport} />
                            </ListItem>
                            <ListItem button onClick={() => setActiveForm('ConsumerReport')}>
                                <ListItemText primary={translations[language].ConsumerReport} />
                            </ListItem>
                            <ListItem button onClick={() => setActiveForm('PaymentReport')}>
                                <ListItemText primary={translations[language].PaidPaymentReports} />
                            </ListItem>
                            <ListItem button onClick={() => setActiveForm('PaymentReportDateWise')}>
                                <ListItemText primary={translations[language].PaymentReportsDateWise} />
                            </ListItem>
                            <ListItem button onClick={() => setActiveForm('WaterBillReport')}>
                                <ListItemText primary={translations[language].WaterBillSearch} />
                            </ListItem>
                            <ListItem button onClick={() => setActiveForm('YearReport')}>
                                <ListItemText primary={translations[language].FinancialYearWiseBillReport} />
                            </ListItem>
                        </List>
                    </Collapse>

                  
                    
                     {/* Settings Section */}
                     <ListItem button onClick={handleSettingsClick}>
                        <ListItemIcon>
                            <ExitToAppIcon style={{ color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText primary={translations[language].Settings} />
                        {settingsOpen ? <ExpandLessIcon style={{ color: 'white' }} /> : <ExpandMoreIcon style={{ color: 'white' }} />}
                    </ListItem>

                    <Collapse in={settingsOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding sx={{ paddingLeft: 4 }}>
                            <ListItem button onClick={() => setActiveForm('ChangePassword')}>
                                <ListItemText primary={translations[language].UpdatePassword} />
                            </ListItem>
                            <ListItem button onClick={() => handleLogout('Logout')}>
                                <ListItemText primary={translations[language].Logout} />
                            </ListItem>
                        </List>
                    </Collapse>
                </List>
            </Sidebar>

            <AppBarStyled position="fixed">
                <Toolbar>
                    <Avatar src={logo} alt="Logo" sx={{ marginRight: '15px' }} />
                    <Typography variant="h5" component="div" sx={{ flexGrow: 1,fontFamily:'Poppins',color: '#ffeb3b',fontWeight:'bold'}}>
                        {translations[language].title}
                    
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {/* <Avatar
                    src={profile?.avatar ? profile.avatar : 'https://example.com/animated-avatar.gif'}
                    alt={name || 'Default Avatar'}
                    sx={{ width: 35, height: 34 }}
                /> */}

            <Typography variant="body1" sx={{ marginRight: 1 ,fontFamily:'cursive'
}} >
             {name
          ? `${translations[language].welcome}, ${name}`
          : translations[language].hello},
            </Typography>
           
        </Box>

                    <IconButton onClick={handleLanguageToggle} sx={{ marginLeft: '16px' }}>
                        <LanguageIcon style={{ color: 'white' }} />
                        
                    </IconButton>
                </Toolbar>
            </AppBarStyled>


            {/* Main Content */}
            <MainContainer maxWidth="lg" sx={{ marginTop: '80px', marginLeft: '240px', marginBottom: '100px'}}>
                <Typography variant="h4" style={{ fontFamily: 'Poppins', color: 'black', fontWeight:'bold' }} align="center" gutterBottom  >
                    {translations[language].welcomeMessage}
                </Typography>
                {displayContent()}
            </MainContainer>

            {/* Footer */}
            <Footer>
                <Typography variant="body2" color="inherit">
                    {translations[language].footer}
                </Typography>
            </Footer>
        </Box>
    );
};

export default AdminDashboard;
