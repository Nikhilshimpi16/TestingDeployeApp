import React, { useEffect, useState } from "react";
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
  Modal,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import axios from "axios";

const PaymentReports = () => {
  const [payments, setPayments] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentMode, setPaymentMode] = useState("Cash");
  const [modalOpen, setModalOpen] = useState(false);
  const [receiptOpen, setReceiptOpen] = useState(false); // For the receipt modal

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/reports/paid-payments"
        );
        setPayments(response.data);
        console.log("Payments Response:", response.data);  // Log the response data

      } catch (error) {
        console.error("Error fetching payment reports:", error);
      }
    };
    fetchPayments();
  }, []);

  const handleViewDetails = (payment) => {
    alert(
      `Payment Details:\n
      Consumer No: ${payment.consumerNo}\n
      Name: ${payment.name || "No Name"}\n 
      Total Bill: ₹${payment.total}\n
      Amount Paid: ₹${payment.nowPaid}\n
      Pending Bill: ₹${payment.pendingBill}\n
      Payment Mode: ${payment.paymentMode}\n
      Status: ${payment.pendingBill === 0 ? "Paid" : "Unpaid"}\n`
    );

    setSelectedPayment(payment);
    setPaymentAmount(payment.pendingBill.toFixed(2));
    setModalOpen(true);
  };

  const handlePayment = async () => {
    if (!paymentAmount || isNaN(paymentAmount) || paymentAmount <= 0) {
      alert("Please enter a valid payment amount.");
      return;
    }

    if (paymentMode === "Online") {
      initiateRazorpayPayment();
    } else {
      try {
        const response = await axios.post("http://localhost:8080/api/pay", {
          consumerNo: selectedPayment.consumerNo,
          paymentAmount: parseFloat(paymentAmount),
          paymentMode,
        });
        updatePaymentData(response.data);
        setReceiptOpen(true); // Open the receipt modal after successful payment
        // sendReceiptEmail(response.data); // Send the receipt to the consumer's email
      } catch (error) {
        console.error("Error processing payment:", error);
        alert("Failed to process payment.");
      }
    }
  };

  const initiateRazorpayPayment = async () => {
    try {
      const orderResponse = await axios.post(
        "http://localhost:8080/api/razorpay/order",
        {
          amount: parseFloat(paymentAmount) * 100, // Convert to paise
          consumerNo: selectedPayment.consumerNo,
        }
      );

      const options = {
        key: "rzp_live_GAkMJ2WxpK5U3B", // Replace with Razorpay API key
        amount: orderResponse.data.amount,
        currency: "INR",
        name: "Water Billing System",
        description: "Payment for your water bill",
        order_id: orderResponse.data.id,
        handler: async function (response) {
          try {
            const verifyResponse = await axios.post(
              "http://localhost:8080/api/razorpay/verify",
              {
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
                signature: response.razorpay_signature,
              }
            );
            updatePaymentData(verifyResponse.data);
            setReceiptOpen(true); // Open the receipt modal after successful payment
            // sendReceiptEmail(verifyResponse.data); // Send the receipt to the consumer's email
          } catch (error) {
            console.error("Payment verification failed:", error);
            alert("Payment verification failed.");
          }
        },
        prefill: {
          name: selectedPayment.name || "Consumer",
          email: selectedPayment.email,
          contact: "9999999999",
        },
        theme: {
          color: "#61dafb",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error initiating Razorpay payment:", error);
    }
  };

  const updatePaymentData = (updatedPayment) => {
    const updatedPayments = payments.map((p) =>
      p.consumerNo === updatedPayment.consumerNo
        ? { ...p, ...updatedPayment, status: "Paid" }  // Update the status here
        : p
    );
    setPayments(updatedPayments);
    alert("Payment processed successfully!");
  };

  const handleCloseReceipt = () => {
    setReceiptOpen(false); // Close the receipt modal
  };

  const handlePrintReceipt = () => {
    window.print(); // Print the receipt
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h5" align="center" gutterBottom sx={{fontFamily:'serif' , fontWeight:'700'}} >
        Payment Reports
      </Typography>
      <Paper elevation={3} sx={{ padding: 3 }}>
  <Box sx={{ maxHeight: 400, overflowY: "auto" }}>
    <TableContainer>
      <Table stickyHeader>
      <TableHead style={{ backgroundColor: "#1976d2" }}>
      <TableRow>
        
            <TableCell style={{ backgroundColor: '#0097a7', color: 'black' }}><b>Consumer No</b></TableCell>
            <TableCell style={{ backgroundColor: '#0097a7', color: 'black' }}><b>Name</b></TableCell>
            <TableCell style={{ backgroundColor: '#0097a7', color: 'black' }}><b>Total Bill</b></TableCell>
            <TableCell style={{ backgroundColor: '#0097a7', color: 'black' }}><b>Amount Paid</b></TableCell>
            <TableCell style={{ backgroundColor: '#0097a7', color: 'black' }}><b>Pending Bill</b></TableCell>
            <TableCell style={{ backgroundColor: '#0097a7', color: 'black' }}><b>BillGeneratedDate</b></TableCell> 
            <TableCell style={{ backgroundColor: '#0097a7', color: 'black' }}><b>Payment Mode</b></TableCell>
            <TableCell style={{ backgroundColor: '#0097a7', color: 'black' }}><b>Status</b></TableCell>
            <TableCell style={{ backgroundColor: '#0097a7', color: 'black' }}><b>Actions</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {payments.map((payment, index) => (
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
              <TableCell>{payment.paymentMode || "N/A"}</TableCell>
              <TableCell>
                <Typography
                  sx={{
                    color: payment.pendingBill === 0 ? "green" : "red",
                    fontWeight: "bold",
                  }}
                >
                  {payment.pendingBill === 0 ? "Paid" : "Unpaid"}
                </Typography>
              </TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleViewDetails(payment)}
                  disabled={payment.pendingBill === 0}
                >
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
</Paper>
      {/* Payment Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Payment for Consumer {selectedPayment?.consumerNo}
          </Typography>
          <TextField
            label="Payment Amount"
            fullWidth
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Payment Mode</InputLabel>
            <Select
              value={paymentMode}
              onChange={(e) => setPaymentMode(e.target.value)}
            >
              <MenuItem value="Cash">Cash</MenuItem>
              <MenuItem value="Online">Online</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handlePayment}
          >
            Pay Now
          </Button>
        </Box>
      </Modal>

      {/* Receipt Modal */}
      <Modal open={receiptOpen} onClose={handleCloseReceipt}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            overflowY: "auto",
          }}
        >
          <Typography
            variant="h5"
            align="center"
            sx={{ fontWeight: "bold", marginBottom: 2 }}
          >
            Water Billing Management Receipt
          </Typography>
          <Typography
            variant="h6"
            align="center"
            sx={{ fontWeight: "bold", marginBottom: 2 }}
          >
            पानी बिल व्यवस्थापन रसीद
          </Typography>
          <Divider sx={{ marginBottom: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography><strong>Consumer No:</strong> {selectedPayment?.consumerNo}</Typography>
              <Typography><strong>Name:</strong> {selectedPayment?.name}</Typography>
              <Typography><strong>Total Bill:</strong> ₹{selectedPayment?.total.toFixed(2)}</Typography>
            {/* //  <Typography><strong> BillGenerated Date:</strong> {selectedPayment?.billGeneratedDate || "N/A"}</Typography> */}
              <Typography><strong>Amount Paid:</strong> ₹{selectedPayment?.nowPaid.toFixed(2)}</Typography>
              <Typography><strong>Pending Bill:</strong> ₹0.00</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography><strong>Status:</strong> Paid</Typography>
              <Typography><strong>Payment Mode:</strong> {selectedPayment?.paymentMode}</Typography>
              <Typography><strong>Date:</strong> {new Date().toLocaleDateString()}</Typography>
            </Grid>
          </Grid>
          <Typography align="center" color="green" sx={{ marginTop: 2 }}>
            Your payment is cleared.
          </Typography>
          <Typography
            align="center"
            sx={{ color: "red", fontSize: "24px", fontWeight: "bold" }}
          >
            PAID
          </Typography>
          <Divider sx={{ marginBottom: 2 }} />
          <Box display="flex" justifyContent="space-between">
            <Button
              variant="contained"
              color="primary"
              onClick={handlePrintReceipt}
              sx={{ marginRight: 2 }}
            >
              Print
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleCloseReceipt}>
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default PaymentReports;
