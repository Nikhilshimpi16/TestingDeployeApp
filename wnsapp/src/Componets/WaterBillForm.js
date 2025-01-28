


import React, { useEffect, useState } from "react";
import { TextField, Button, Grid, Paper, Typography, Select, MenuItem, FormControl, InputLabel, Dialog, IconButton ,Divider,DialogActions,DialogContent} from "@mui/material";
import { Close, Download } from "@mui/icons-material";
import axios from "axios";
import { jsPDF } from "jspdf";

const BillGeneratedForm = () => {
  const [formData, setFormData] = useState({
    consumerNo: "",
    name: "",
    billGeneratedDate: new Date().toISOString().split("T")[0],
    expiryDate: "",
    currentReading: "",
    previousReading: "",
    unitConsumed: "",
    perUnitRate: "",
    perMonthlyRate: "",
    otherCharges: "",
    fees: "",
    deposited: "",
    totalBill: "",
    mode: "OFF",
    financialYear: "",
    financialYearStart: "",
    financialYearEnd: "",
  });

  const [consumerList, setConsumerList] = useState([]);
  const [billDetails, setBillDetails] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/consumers")
      .then((response) => setConsumerList(response.data))
      .catch((error) => {
        console.error("Error fetching consumer list:", error);
        alert("Error fetching consumer list!");
      });
  }, []);

     // Function to calculate expiry date (3 months after billGeneratedDate)
  useEffect(() => {
    const calculateExpiryDate = (billDate) => {
      const date = new Date(billDate);
      date.setMonth(date.getMonth() + 3); // Add 3 months
      return date.toISOString().split("T")[0]; // Format as YYYY-MM-DD
    };
  
    // Update expiryDate when billGeneratedDate changes
    if (formData.billGeneratedDate) {
      const updatedExpiryDate = calculateExpiryDate(formData.billGeneratedDate);
      setFormData((prevData) => ({
        ...prevData,
        expiryDate: updatedExpiryDate,
      }));
    }
  }, [formData.billGeneratedDate]);
  

  //  // Calculate financial year when the form is loaded
  //  useEffect(() => {
  //   const calculateFinancialYear = () => {
  //     const today = new Date();
  //     const currentYear = today.getFullYear();
  //     const currentMonth = today.getMonth() + 1; // Months are 0-based (0 = January)
  //     const startYear = currentMonth >= 4 ? currentYear : currentYear - 1; // Year of April 1
  //     const endYear = startYear + 1; // Year of March 31 in the next year

  //     const financialYear = `${startYear}-${endYear}`;
  //     const financialYearStart = `${startYear}-04-01`; // April 1 of the current year
  //     const financialYearEnd = `${endYear}-03-31`; // March 31 of the next year

  //     setFormData((prevData) => ({
  //       ...prevData,
  //       financialYear,
  //       financialYearStart,
  //       financialYearEnd,
  //     }));
  //   };

  //   calculateFinancialYear();
  // }, []);


  // const handleDateChange = (e) => {
  //   const date = e.target.value;
  //   const financialYear = calculateFinancialYear(date);
  //   setFormData({ ...formData, billGeneratedDate: date, financialYearDate: financialYear });
  // };

  useEffect(() => {
    if (formData.consumerNo) {
      axios
        .get(`http://localhost:8080/api/consumers/${formData.consumerNo}`)
        .then((response) => {
          setFormData((prevData) => ({
            ...prevData,
            name: response.data.name,
          }));
  
          // Check if the bill has already been generated for the selected consumer
          axios
            .get(`http://localhost:8080/api/bills/consumer/${formData.consumerNo}`)
            .then((billResponse) => {
              if (billResponse.data) {
                // Bill already generated for this consumer, show alert
                alert("Bill already generated for this consumer!");
                // Optionally, disable the form to prevent further changes
                setFormData((prevData) => ({
                  ...prevData,
                  consumerNo: "", // Reset the consumerNo to prevent further actions
                }));
              }
            })
            .catch((error) => {
              console.error("Error checking bill existence:", error);
              // If no bill exists, we don't need to alert
            });
        })
        .catch((error) => {
          console.error("Error fetching consumer details:", error);
          alert("Consumer not found!");
        });
    }
  }, [formData.consumerNo]);

  useEffect(() => {
  // Fetch the latest perUnitRate
  axios
    .get("http://localhost:8080/api/meter-rate/latest")
    .then((response) => {
      console.log("Meter rate fetched:", response.data); // Debugging log
      if (response.data && response.data.price) {
        setFormData((prev) => ({ ...prev, perUnitRate: response.data.price }));
      } else {
        alert("Invalid response structure for meter rate!");
      }
    })
    .catch((error) => {
      console.error("Error fetching meter rate:", error); // Error log
      alert("Error fetching meter rate!");
    });
}, []);



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


const calculateFinancialYear = (date) => {
  const currentYear = new Date(date).getFullYear();
  const nextYear = currentYear + 1;
  return `${currentYear}-${nextYear}`;
};

const handleDateChange = (field, value) => {
  setFormData((prevData) => ({
    ...prevData,
    [field]: value,
  }));

  if (field === "billGeneratedDate") {
    const financialYear = calculateFinancialYear(value);
    const startDate = `${new Date(value).getFullYear()}-04-01`; // Financial year starts on April 1
    const endDate = `${new Date(value).getFullYear() + 1}-03-31`; // Ends on March 31 next year

    setFormData((prevData) => ({
      ...prevData,
      financialYear,
      financialYearStart: startDate,
      financialYearEnd: endDate,
    }));
  }
};

  useEffect(() => {
    if (formData.currentReading && formData.previousReading) {
      const unit = formData.currentReading - formData.previousReading;
      const perMonthlyRate = unit * formData.perUnitRate;
      setFormData((prevData) => ({
        ...prevData,
        unitConsumed: unit,
        perMonthlyRate: perMonthlyRate.toFixed(2),
      }));
    }
  }, [formData.currentReading, formData.previousReading, formData.perUnitRate]);

  useEffect(() => {
    const totalBill =
      parseFloat(formData.perMonthlyRate || 0) +
      parseFloat(formData.otherCharges || 0) +
      parseFloat(formData.fees || 0) -
      parseFloat(formData.deposited || 0);
    setFormData((prevData) => ({
      ...prevData,
      totalBill: totalBill.toFixed(2),
    }));
  }, [formData.perMonthlyRate, formData.otherCharges, formData.fees, formData.deposited]);




   // Handle saving the bill data
   const handleSave = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8080/api/bills", formData)
      .then((response) => {
        setBillDetails(response.data);
        setShowPopup(true);
        alert(`Bill successfully generated with InvoiceNo: ${response.data.invoiceNo}`);
        refreshForm();
      })
      .catch((error) => {
        console.error("Error saving bill:", error);
        alert("Error generating bill!");
      });
  };


  const refreshForm = () => {
    setFormData({
      consumerNo: "",
      name: "",
      billGeneratedDate: new Date().toISOString().split("T")[0],
      expiryDate: "",
      currentReading: "",
      previousReading: "",
      unitConsumed: "",
      perUnitRate: "",
      perMonthlyRate: "",
      otherCharges: "",
      fees: "",
      deposited: "",
      totalBill: "",
      mode: "OFF",
    });
  };

//    Generate PDF
const generatePDF = (data) => {
  const doc = new jsPDF();

  // Ensure all values are available
  const {
    consumerNo = "",
    name = "",
    billGeneratedDate = "",
    expiryDate = "",
    financialYear = "",
    financialYearStart = "",
    financialYearEnd = "",
    currentReading = "",
    previousReading = "",
    unitConsumed = "",
    perUnitRate = "",
    perMonthlyRate = "",
    otherCharges = "",
    fees = "",
    deposited = "",
    totalBill = "",
  } = data;

  // Content for PDF
  const billContent = `
    Bill Receipt
    -------------------------
    Consumer No: ${consumerNo}
    Name: ${name}
    Bill Generated Date: ${billGeneratedDate}
    Expiry Date: ${expiryDate}
    Financial Year: ${financialYear}
    Financial Year Start: ${financialYearStart}
    Financial Year End: ${financialYearEnd}
    Current Reading: ${currentReading}
    Previous Reading: ${previousReading}
    Unit Consumed: ${unitConsumed}
    Per Unit Rate: ${perUnitRate}
    Monthly Rate: ${perMonthlyRate}
    Other Charges: ${otherCharges}
    Fees: ${fees}
    Deposited: ${deposited}
    Total Bill: ${totalBill}
  `;

  // Add content to the PDF document
  doc.setFont("courier", "normal");
  doc.setFontSize(12);
  const contentLines = doc.splitTextToSize(billContent, 190); // Split text for better alignment
  doc.text(contentLines, 10, 20); // Start content at (10, 20)

  // Save the generated PDF with a dynamic filename
  const fileName = `Bill_${consumerNo || "Unknown"}_Receipt.pdf`;
  doc.save(fileName);
};

const handleDownload = () => {
  // Validate form data before generating PDF
  if (!formData || Object.keys(formData).length === 0) {
    alert("Form data is not available or incomplete.");
    return;
  }

  // Debugging: Log formData
  console.log("Form Data:", formData);

  // Call generatePDF with the correct formData
  generatePDF(formData);
};

  return (
    <Paper elevation={3} style={{ padding: "30px", maxWidth: "90%", margin: "20px auto", backgroundColor: "#f5f5f5", borderRadius: "10px" }}>
      <Typography variant="h5" gutterBottom style={{ textAlign: "center", marginBottom: "20px", fontFamily:'poppins', fontWeight:'550'}}>
        Bill Generation Form
      </Typography>
      <Grid container spacing={3} style={{ display: "flex", justifyContent: "center" }}>
        <Grid item xs={6}>  
          <FormControl fullWidth>
            <InputLabel>Consumer No</InputLabel>
            <Select value={formData.consumerNo} onChange={(e) => setFormData({ ...formData, consumerNo: e.target.value })} label='consumerNo'>
              
              {consumerList.map((consumer) => (
                <MenuItem key={consumer.consumerNo} value={consumer.consumerNo}>
                  {consumer.consumerNo}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      
        <Grid item xs={6}>
          <TextField label="Name" value={formData.name} disabled fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Bill Generated Date"
            type="date"
            value={formData.billGeneratedDate}
            onChange={(e) => handleDateChange("billGeneratedDate", e.target.value)}
            fullWidth
          />
        </Grid>
        {/* <Grid item xs={6}>
          <TextField
            label="Bill Generated Date"
            type="date"
            value={formData.billGeneratedDate}
            onChange={handleDateChange}
            fullWidth
          />
          </Grid> */}

       
        <Grid item xs={6}>
          <TextField label="Expiry Date" value={formData.expiryDate} disabled fullWidth />
        </Grid>

        {/* <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
             // label="Financial Year"
              value={formData.financialYear}
              disabled
              fullWidth
            />
          </Grid>
          </Grid> */}

          <Grid item xs={6}>
            <TextField
             // label="Financial Year Start Date"
              value={formData.financialYearStart}
              disabled
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              //label="Financial Year End Date"
              value={formData.financialYearEnd}
              disabled
              fullWidth
            />
          </Grid>

        
        <Grid item xs={6}>
          <TextField
            label="Current Reading"
            type="number"
            value={formData.currentReading}
            onChange={(e) => setFormData({ ...formData, currentReading: e.target.value })}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Previous Reading"
            type="number"
            value={formData.previousReading}
            onChange={(e) => setFormData({ ...formData, previousReading: e.target.value })}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Units Consumed" value={formData.unitConsumed} disabled fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Per Unit Rate" value={formData.perUnitRate} disabled fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Monthly Rate" value={formData.perMonthlyRate} disabled fullWidth />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Other Charges"
            type="number"
            value={formData.otherCharges}
            onChange={(e) => setFormData({ ...formData, otherCharges: e.target.value })}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Fees"
            type="number"
            value={formData.fees}
            onChange={(e) => setFormData({ ...formData, fees: e.target.value })}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Deposited"
            type="number"
            value={formData.deposited}
            onChange={(e) => setFormData({ ...formData, deposited: e.target.value })}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Total Bill" value={formData.totalBill} disabled fullWidth />
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            {/* <InputLabel>Mode</InputLabel> */}
            <Select value={formData.mode} onChange={(e) => setFormData({ ...formData, mode: e.target.value })}>
              <MenuItem value="OFF">Offline</MenuItem>
              <MenuItem value="Online">Online</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" color="primary" onClick={handleSave} fullWidth>
            Save
          </Button>
        </Grid>
      </Grid>
      {/* Popup Dialog */}
      {billDetails && (
  <Dialog open={showPopup} onClose={() => setShowPopup(false)} maxWidth="sm" fullWidth>
    <Paper style={{ borderRadius: "10px", padding: "20px" }}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Typography variant="h5" style={{ fontWeight: "bold", color: "#3f51b5" }}>
          Bill Details
        </Typography>
        <IconButton onClick={() => setShowPopup(false)} aria-label="close">
          <Close />
        </IconButton>
      </Grid>
      <Divider style={{ margin: "10px 0" }} />
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="subtitle2" color="textSecondary">Invoice No</Typography>
            <Typography variant="body1">{billDetails.receiptNo}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2" color="textSecondary">Consumer No</Typography>
            <Typography variant="body1">{billDetails.consumerNo}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2" color="textSecondary">Name</Typography>
            <Typography variant="body1">{billDetails.name}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2" color="textSecondary">Bill Generated Date</Typography>
            <Typography variant="body1">{billDetails.billGeneratedDate}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2" color="textSecondary">Expiry Date</Typography>
            <Typography variant="body1">{billDetails.expiryDate}</Typography>
          </Grid>
       
          {/* <Grid item xs={6}>
            <Typography variant="subtitle2" color="textSecondary">Financial Year EndDate</Typography>
            <Typography variant="body1">{billDetails.financialYearEnd}</Typography>
          </Grid> */}
          <Grid item xs={6}>
            <Typography variant="subtitle2" color="textSecondary">Current Reading</Typography>
            <Typography variant="body1">{billDetails.currentReading}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2" color="textSecondary">Previous Reading</Typography>
            <Typography variant="body1">{billDetails.previousReading}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2" color="textSecondary">Units Consumed</Typography>
            <Typography variant="body1">{billDetails.unitConsumed}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2" color="textSecondary">Per Unit Rate</Typography>
            <Typography variant="body1">{billDetails.perUnitRate}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2" color="textSecondary">Monthly Rate</Typography>
            <Typography variant="body1">{billDetails.perMonthlyRate}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2" color="textSecondary">Other Charges</Typography>
            <Typography variant="body1">{billDetails.otherCharges}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2" color="textSecondary">Fees</Typography>
            <Typography variant="body1">{billDetails.fees}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2" color="textSecondary">Deposited</Typography>
            <Typography variant="body1">{billDetails.deposited}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2" color="textSecondary">Mode</Typography>
            <Typography variant="body1">{billDetails.mode}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2" color="textSecondary">Total</Typography>
            <Typography variant="h6" style={{ fontWeight: "bold", color: "#f50057" }}>
              {billDetails.total}
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions style={{ justifyContent: "center", marginTop: "20px" }}>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<Download />}
          onClick={handleDownload}        >
          Download
        </Button>
      </DialogActions>
    </Paper>
  </Dialog>
)}
    </Paper>
  );
};

export default BillGeneratedForm;
