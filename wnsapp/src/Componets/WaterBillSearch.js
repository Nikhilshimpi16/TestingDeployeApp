import React, { useState } from "react";
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
} from "@mui/material";
import { Search } from "@mui/icons-material";
import axios from "axios";

const WaterBillSearch = () => {
  const [filterData, setFilterData] = useState({ startDate: "", endDate: "" });
  const [reportData, setReportData] = useState([]);

  const handleFetchReport = () => {
    axios
      .get("http://localhost:8080/api/bills/reports", {
        params: {
          startDate: filterData.startDate,
          endDate: filterData.endDate,
        },
      })
      .then((response) => {
        setReportData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching report:", error);
        alert("Error fetching report data!");
      });
  };

  // Automatically set the end date to 3 months after the start date
  const handleStartDateChange = (e) => {
    const startDate = e.target.value;
    setFilterData((prevData) => {
      const newEndDate = new Date(startDate);
      newEndDate.setMonth(newEndDate.getMonth() + 3); // Add 3 months
      return {
        ...prevData,
        startDate,
        endDate: newEndDate.toISOString().split("T")[0], // Format as YYYY-MM-DD
      };
    });
  };

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
      {/* Header */}
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        style={{ fontWeight: "bold", color: "#1976d2" }}
      >
        Find Water Bill  <br />
        <span style={{ fontSize: "1.2rem", color: "#555" }}>
        पाणी बिल शोधा
        </span>
      </Typography>
      {/* <Typography
        variant="body1"
        align="center"
        gutterBottom
        style={{ marginBottom: "20px", color: "#555" }}
      >
        Use the filters below to fetch reports for a specific date range.
        <br />
        खालील फिल्टर्स वापरून विशिष्ट दिनांक श्रेणीसाठी अहवाल मिळवा.
      </Typography> */}

      {/* Filters */}
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} sm={5}>
          <TextField
            label="Start Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={filterData.startDate}
            onChange={handleStartDateChange}
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={5}>
          <TextField
            label="End Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={filterData.endDate}
            onChange={(e) =>
              setFilterData({ ...filterData, endDate: e.target.value })
            }
            fullWidth
            variant="outlined"
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={2} style={{ textAlign: "center" }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleFetchReport}
            startIcon={<Search />}
            style={{ height: "100%" }}
          >
            Search
          </Button>
        </Grid>
      </Grid>

      {/* Report Section */}
      <Typography
        variant="h5"
        style={{
          marginTop: "30px",
          fontWeight: "bold",
          color: "#1976d2",
          marginBottom: "10px",
        }}
      >
        Filtered Reports <br />
        <span style={{ fontSize: "1.2rem", color: "#555" , fontFamily:"sans-serif"}}>
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
          No reports found for the selected date range.
          <br />
          निवडलेल्या तारीख श्रेणीसाठी अहवाल नाहीत.
        </Typography>
      )}
    </Paper>
  );
};

export default WaterBillSearch;
