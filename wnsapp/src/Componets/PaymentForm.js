import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid
} from "@mui/material";
import { QRCodeCanvas } from "qrcode.react";
import axios from "axios";
import { Print as PrintIcon, Download as DownloadIcon } from "@mui/icons-material";
import { Navigate } from "react-router-dom";

const PaymentForm = () => {
  const [consumerNo, setConsumerNo] = useState("");
  const [billDetails, setBillDetails] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    nowPaid: "",
    pendingBill: "",
    paymentMode: "Cash",
  });
  const [paymentReceipt, setPaymentReceipt] = useState(null); // New state for the payment receipt

  // Handle search
  const handleSearch = async () => {
    try {
        const response = await axios.get(
            `http://localhost:8080/api/bills/consumer/${consumerNo}`
        );

        if (response.data === "Payment already made for this consumer.") {
            setErrorMessage("This consumer has already paid the bill.");
            setBillDetails(null); // Clear any existing bill details
            setShowPaymentDialog(false); // Hide payment dialog
        } else {
            setBillDetails(response.data); // Display bill details
            setErrorMessage(""); // Clear any previous error
        }
    } catch (error) {
        setErrorMessage(
            error.response?.data || "Error fetching bill details."
        );
        setBillDetails(null); // Clear bill details if error occurs
        setShowPaymentDialog(false);
    }
};

  // Handle "Now Paid" change
  const handleNowPaidChange = (e) => {
    const nowPaid = parseFloat(e.target.value || 0);
    const pendingBill = parseFloat(billDetails.total || 0) - nowPaid;

    setPaymentDetails({
      ...paymentDetails,
      nowPaid: nowPaid.toFixed(2),
      pendingBill: pendingBill.toFixed(2),
    });
  };

  // Handle payment mode change
  const handlePaymentModeChange = (e) => {
    setPaymentDetails({
      ...paymentDetails,
      paymentMode: e.target.value,
    });
  };

  // Razorpay payment
  const handleOnlinePayment = async () => {
    try {
      // Ensure Razorpay script is loaded
      if (!window.Razorpay) {
        alert("Razorpay SDK not loaded. Please check your internet connection.");
        return;
      }

      // Create Razorpay order
      const response = await axios.post(
        "http://localhost:8080/api/razorpay/order",
        {
          amount: paymentDetails.nowPaid * 100, // Amount in paise
        }
      );

      const { orderId, razorpayKey } = response.data;

      // Razorpay payment options
      const options = {
        key: razorpayKey, // Key provided from backend
        amount: paymentDetails.nowPaid * 100, // Amount in paise
        currency: "INR",
        name: "Water Billing Management",
        description: "Payment for water bill",
        order_id: orderId,
        handler: async (response) => {
          try {
            // Handle successful payment
            const paymentData = {
              consumerNo,
              name:paymentDetails.name,
              nowPaid: paymentDetails.nowPaid,
              pendingBill: paymentDetails.pendingBill,
              paymentMode: "Online",
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              billGeneratedDate: billDetails.billGeneratedDate, // Add billGeneratedDate here

            };

            await axios.post("http://localhost:8080/api/payments", paymentData);

            // Set receipt data
            setPaymentReceipt({
              consumerNo,
              nowPaid: paymentDetails.nowPaid,
              pendingBill: paymentDetails.pendingBill,
              paymentMode: "Online",
              paymentId: response.razorpay_payment_id,
              paymentDate: new Date().toLocaleString(),

            });

            alert("Payment successfully processed!");
            setShowPaymentDialog(false);
            setBillDetails(null);

            window.location.reload();

          } catch (error) {
            console.error("Error saving payment details:", error);
            alert("Error saving payment details. Please try again.");
          }
        },
        prefill: {
          name: billDetails?.name || "Customer",
          email: billDetails?.email || "nikhilshimpi88@gmail.com",
          contact: billDetails?.mobile || "+917887532988",
        },
        theme: {
          color: "#3399cc",
        },
      };

      // Initialize Razorpay
      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response) {
        console.error("Payment failed:", response.error);
        alert("Payment failed. Please try again.");
      });
      rzp.open();
    } catch (error) {
      console.error("Error initiating Razorpay payment:", error);
      alert("Error processing online payment!");
    }
  };

  // Handle payment submission
  const handlePaymentSubmit = async () => {
    try {
      const finalPaymentData = {
        consumerNo,
        name:billDetails.name,
        total: billDetails.total,
        nowPaid: paymentDetails.nowPaid,
        pendingBill: paymentDetails.pendingBill,
        paymentMode: paymentDetails.paymentMode,
        billGeneratedDate: billDetails.billGeneratedDate, // Add billGeneratedDate here

      };

      await axios.post("http://localhost:8080/api/payments", finalPaymentData);
      alert("Payment successfully processed!");
      setShowPaymentDialog(false); // Close the dialog
      setBillDetails(null); // Clear the bill details after payment
      
      window.location.reload();

    } catch (error) {
      console.error("Error processing payment:", error);
      alert("Error processing payment!");
    }
  };

  // Handle print receipt
  const handlePrintReceipt = () => {
    const printContent = document.getElementById("receiptContent");
    const printWindow = window.open();
    printWindow.document.write(printContent.outerHTML);
    printWindow.print();
  };

  // Handle download receipt
  const handleDownloadReceipt = () => {
    const element = document.createElement("a");
    const receiptContent = document.getElementById("receiptContent").innerText;
    const file = new Blob([receiptContent], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "payment_receipt.txt";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <Box sx={{ padding: 4, maxWidth: 800, margin: "0 auto" }}>
      <Typography variant="h5" align="center" gutterBottom fontFamily={'poppins'} fontWeight={'700'}>
        Payment Form
      </Typography>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <TextField
          fullWidth
          label="Enter Consumer No"
          variant="outlined"
          value={consumerNo}
          onChange={(e) => setConsumerNo(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <Button variant="contained" color="primary" onClick={handleSearch} fullWidth>
          Search
        </Button>

        {errorMessage && (
          <Typography color="error" sx={{ marginTop: 2 }}>
            {errorMessage}
          </Typography>
        )}

{billDetails && (
          <Box sx={{ marginTop: 3 }}>
            <Typography variant="h6" gutterBottom>
              Bill Details:
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography><b>Name :</b></Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{billDetails.name}</Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography><b>BillGeneratedDate :</b></Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{billDetails.billGeneratedDate}</Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography><b>ExpiryDate :</b></Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{billDetails.expiryDate}</Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography><b>PerMonthlyRate :</b></Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{billDetails.perMonthlyRate}</Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography><b>OtherCharges :</b></Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{billDetails.otherCharges}</Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography><b>Fees :</b></Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{billDetails.fees}</Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography><b>Deposited :</b></Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{billDetails.deposited}</Typography>
              </Grid>

              {/* Other Bill Details */}
              <Grid item xs={6}>
                <Typography><b>Total Amount:</b></Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{billDetails.total}</Typography>
              </Grid>
            </Grid>
             <Button
              variant="contained"
              color="success"
              sx={{ marginTop: 3 }}
              onClick={() => setShowPaymentDialog(true)}
              fullWidth
              disabled={errorMessage !== ""} // Disable if errorMessage is not empty
          >
              Proceed to Pay
          </Button>
          </Box>
        )}
      </Paper>

      {/* Payment Dialog */}
      <Dialog open={showPaymentDialog} onClose={() => setShowPaymentDialog(false)}>
        <DialogTitle>Payment Details</DialogTitle>
        <DialogContent>
          <Typography variant="h6">
            Total Amount: ₹{billDetails?.total || "0.00"}
          </Typography>
          <TextField
            label="Now Paid"
            variant="outlined"
            type="number"
            value={paymentDetails.nowPaid}
            onChange={handleNowPaidChange}
            fullWidth
            sx={{ marginTop: 2 }}
          />
          <Typography variant="body1" sx={{ marginTop: 2, color: "red" }}>
            Pending Bill: ₹{paymentDetails.pendingBill}
          </Typography>
          <FormControl fullWidth sx={{ marginTop: 2 }}>
            <InputLabel>Payment Mode</InputLabel>
            <Select
              value={paymentDetails.paymentMode}
              onChange={handlePaymentModeChange}
              label='Payment Mode'
            >
              <MenuItem value="Cash">Cash</MenuItem>
              <MenuItem value="Online">Online</MenuItem>
            </Select>
          </FormControl>

          {paymentDetails.paymentMode === "Online" && (
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleOnlinePayment}
              sx={{ marginTop: 2 }}
            >
              Pay Online
            </Button>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowPaymentDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handlePaymentSubmit} color="secondary">
            Submit Payment
          </Button>
        </DialogActions>
      </Dialog>

      {/* Receipt Dialog */}
      {paymentReceipt && (
        <Dialog open={Boolean(paymentReceipt)} onClose={() => setPaymentReceipt(null)}>
          <DialogTitle>Payment Receipt</DialogTitle>
          <DialogContent id="receiptContent">
            <Typography variant="h6">Receipt for Consumer No: {paymentReceipt.consumerNo}</Typography>
            <Typography variant="body1">Amount Paid: ₹{paymentReceipt.nowPaid}</Typography>
            <Typography variant="body1">Pending Bill: ₹{paymentReceipt.pendingBill}</Typography>
            <Typography variant="body1">Payment Mode: {paymentReceipt.paymentMode}</Typography>
            <Typography variant="body1">Payment Date: {paymentReceipt.paymentDate}</Typography>
            <Typography variant="body1">Payment ID: {paymentReceipt.paymentId}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handlePrintReceipt} startIcon={<PrintIcon />} color="primary">
              Print
            </Button>
            <Button onClick={handleDownloadReceipt} startIcon={<DownloadIcon />} color="secondary">
              Download
            </Button>
            <Button onClick={() => setPaymentReceipt(null)} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default PaymentForm;
