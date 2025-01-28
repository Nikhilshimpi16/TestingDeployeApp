import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import axios from "axios";

const FinancialYearWiseBillReport = () => {
  const [selectedYear, setSelectedYear] = useState("");  // Use this to store the selected financial year
  const [financialYears, setFinancialYears] = useState([]);  // Store available years
  const [reportData, setReportData] = useState([]);  // Store report data
  const [formData , setFormData] = useState([]);

  // Fetch available financial years from API or hardcode if required
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/bills/financial-years")
      .then((response) => {
        setFinancialYears(response.data);  // Set available financial years
      })
      .catch((error) => {
        console.error("Error fetching financial years:", error);
      });
  }, []);

  // Function to fetch report data based on selected financial year
  const handleFetchReport = () => {
    if (!selectedYear) {
      alert("Please select a financial year!");
      return;
    }

    // Make API call with the selected financial year
    axios
      .get("http://localhost:8080/api/bills/financial-year-report", {
        params: { financialYear: selectedYear },  // Pass the selected year here
      })
      .then((response) => {
        console.log("Filtered reports:", response.data);
        setReportData(response.data);  // Set the report data to display
      })
      .catch((error) => {
        console.error("Error fetching reports:", error);
      });
  };

 // finacial Year calculations.
  useEffect(() => {
    const fetchFinancialYear = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/bills/financialYear");
        const { financialYear, startDate, endDate } = response.data;
        setFormData((prevData) => ({
          ...prevData,
          financialYear,
          financialYearStart: startDate,
          financialYearEnd: endDate,
          
        }));
      } catch (error) {
        console.error("Error fetching financial year:", error);
      }
    };
  
    fetchFinancialYear();
  }, []);
  return (
    <Paper
      elevation={4}
      style={{
        padding: "30px",
        maxWidth: "1000px",
        margin: "30px auto",
        backgroundColor: "#f9f9f9",
        borderRadius: "15px",
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        align="center"
        style={{ fontWeight: "bold", color: "#1976d2" , fontFamily:'sans-serif' }}
      >
        Financial Year Wise Bill Report
        <br />
        <span style={{ fontSize: "1.2rem", color: "#555" }}>
          आर्थिक वर्षानुसार बिल अहवाल
        </span>
      </Typography>

      {/* Financial Year Dropdown */}
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} sm={6} >
          <FormControl fullWidth variant="outlined" >
            <InputLabel>Financial Year</InputLabel>
            <Select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}  // Update selected year
              label="Financial Year"
            >
              {financialYears.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={2} style={{ textAlign: "center" }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleFetchReport}  // Fetch report data on click
            startIcon={<Search />}
            style={{ height: "100%" }}
          >
            Search
          </Button>
        </Grid>
      </Grid>
 
      

      {/* Report Section */}
      <Typography
        variant="h6"
        style={{
          marginTop: "30px",
          fontWeight: "bold",
          color: "#1976d2",
          marginBottom: "10px",
        }}
      >
        Filtered Reports
        <br />
        <span style={{ fontSize: "1.2rem", color: "#555", fontFamily: "sans-serif" }}>
          फिल्टर केलेले अहवाल
        </span>
      </Typography>
      {reportData.length > 0 ? (
        <TableContainer component={Paper} style={{ marginTop: "10px" }}>
          <Table>
            <TableHead style={{ backgroundColor: "#1976d2" }}>
              <TableRow>
                <TableCell style={{ color: "#fff", fontWeight: "bold" }}>
                  Receipt No
                  <br />
                  रसीद क्र.
                </TableCell>
                <TableCell style={{ color: "#fff", fontWeight: "bold" }}>
                  Consumer No
                  <br />
                  ग्राहक क्र.
                </TableCell>
                <TableCell style={{ color: "#fff", fontWeight: "bold" }}>
                  Name
                  <br />
                  नाव
                </TableCell>
                <TableCell style={{ color: "#fff", fontWeight: "bold" }}>
                  Bill Generated Date
                  <br />
                  बिल निर्माण तारीख
                </TableCell>
                <TableCell style={{ color: "#fff", fontWeight: "bold" }}>
                  Expiry Date
                  <br />
                  समाप्ती तारीख
                </TableCell>
                <TableCell style={{ color: "#fff", fontWeight: "bold" }}>
                  Total Amount
                  <br />
                  एकूण रक्कम
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reportData.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>{report.receiptNo}</TableCell>
                  <TableCell>{report.consumerNo}</TableCell>
                  <TableCell>{report.name}</TableCell>
                  <TableCell>{report.billGeneratedDate}</TableCell>
                  <TableCell>{report.expiryDate}</TableCell>
                  <TableCell>₹{report.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography
          variant="body1"
          align="center"
          style={{ marginTop: "20px", color: "#777" }}
        >
          No reports found for the selected financial year.
          <br />
          निवडलेल्या आर्थिक वर्षासाठी अहवाल नाहीत.
        </Typography>
      )}
    </Paper>
  );
};

export default FinancialYearWiseBillReport;
