import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  Grid,
} from "@mui/material";
import axios from "axios";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";

const PaymentReportsDateWise = () => {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [consumerNo, setConsumerNo] = useState("");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  // Fetch initial payment data
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/reports/all-payments");
        setPayments(response.data);
        setFilteredPayments(response.data);
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };
    fetchPayments();
  }, []);

  // Filter payments based on criteria
  const filterPayments = () => {
    let filtered = payments;

    // Filter by Consumer No
    if (consumerNo) {
      filtered = filtered.filter((payment) =>
        payment.consumerNo.toLowerCase().includes(consumerNo.toLowerCase())
      );
    }

    // Filter by Date Range (Bill Generated Date)
    if (fromDate && toDate) {
      filtered = filtered.filter((payment) => {
        const paymentDate = new Date(payment.billGeneratedDate);
        return paymentDate >= new Date(fromDate) && paymentDate <= new Date(toDate);
      });
    }

    setFilteredPayments(filtered);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Payment Reports - Date & Consumer Wise
      </Typography>
      <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
        <Typography variant="h6" gutterBottom>
          Filters
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Consumer No"
              variant="outlined"
              fullWidth
              value={consumerNo}
              onChange={(e) => setConsumerNo(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="From Date"
                value={fromDate}
                onChange={(newValue) => setFromDate(newValue)}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="To Date"
                value={toDate}
                onChange={(newValue) => setToDate(newValue)}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={filterPayments}>
              Apply Filters
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h6" align="center" gutterBottom>
          Payment Details
        </Typography>
        <TableContainer>
          <Table>
            <TableHead style={{ backgroundColor: "#1976d2" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', color: '#f5f5f5' }}><b>Consumer No / ग्राहक क्रमांक</b></TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#f5f5f5' }}><b>Name / नाव</b></TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#f5f5f5' }}><b>Total Bill / एकूण बिल</b></TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#f5f5f5' }}><b>Amount Paid / भरलेली रक्कम</b></TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#f5f5f5' }}><b>Pending Bill / बाकी बिल</b></TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#f5f5f5' }}><b>Bill Generated Date / बिल तयार झाल्याची तारीख</b></TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#f5f5f5' }}><b>Expiry Date / मुदत समाप्ती</b></TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#f5f5f5' }}><b>Payment Mode / पेमेंट मोड</b></TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#f5f5f5' }}><b>Status / स्थिती</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPayments.map((payment, index) => (
                <TableRow key={index}>
                  <TableCell>{payment.consumerNo}</TableCell>
                  <TableCell>{payment.name || "No Name"}</TableCell>
                  <TableCell>₹{payment.total.toFixed(2)}</TableCell>
                  <TableCell>₹{payment.nowPaid.toFixed(2)}</TableCell>
                  <TableCell>₹{payment.pendingBill.toFixed(2)}</TableCell>
                  <TableCell>
                    {payment.billGeneratedDate
                      ? new Date(payment.billGeneratedDate).toLocaleDateString()
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    {payment.expiryDate
                      ? new Date(payment.expiryDate).toLocaleDateString()
                      : "N/A"}
                  </TableCell>
                  <TableCell>{payment.paymentMode || "N/A"}</TableCell>
                  <TableCell>
                    <Typography
                      sx={{
                        color: payment.pendingBill === 0 ? "green" : "red",
                        fontWeight: "bold",
                      }}
                    >
                      {payment.pendingBill === 0 ? "Paid " : "Unpaid"}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default PaymentReportsDateWise;
