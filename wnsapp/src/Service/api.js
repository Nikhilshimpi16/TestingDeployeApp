import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import axios from '../Service/api'; // Axios service for API calls

const Dashboard = () => {
  const [registrationCount, setRegistrationCount] = useState(0);

  useEffect(() => {
    axios.get('/api/count').then((response) => {
      setRegistrationCount(response.data);
    });
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h5">Total Registrations</Typography>
            <Typography variant="h6">{registrationCount}</Typography>
          </CardContent>
        </Card>
      </Grid>
      {/* More cards for other metrics */}
    </Grid>
  );
};

export default Dashboard;



// const AdminReports = () => {
//     const [reports, setReports] = useState([]);
  
//     useEffect(() => {
//       axios.get('/api/reports/admin').then((response) => {
//         setReports(response.data);
//       });
//     }, []);
  
//     return (
//       <div>
//         <Typography variant="h4">Admin Reports</Typography>
//         {/* Loop over reports and display them */}
//         {reports.map((report, index) => (
//           <div key={index}>
//             <Typography variant="body1">{report}</Typography>
//           </div>
//         ))}
//       </div>
//     );
//   };
  
//   export default AdminReports;
  
