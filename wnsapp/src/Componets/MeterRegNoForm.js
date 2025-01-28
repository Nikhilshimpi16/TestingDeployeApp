import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Modal,
} from '@mui/material';
import { Edit, Delete, Visibility } from '@mui/icons-material';
import axios from 'axios';
import WaterDropIcon from '@mui/icons-material/WaterDrop';

const MeterRegNoForm = () => {
  const [formData, setFormData] = useState({
    meterCompanyName: '',
    meterNo: '',
  });

  const [meters, setMeters] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [reportModalOpen, setReportModalOpen] = useState(false);

  useEffect(() => {
    fetchMeters();
  }, []);

  const fetchMeters = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/meter-register');
      setMeters(response.data);
    } catch (error) {
      console.error('Error fetching meters:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:8080/api/meter-register/${editingId}`, formData);
        alert('Meter updated successfully!');
      } else {
        await axios.post('http://localhost:8080/api/meter-register', formData);
        alert('Meter registration successful!');
      }
      setFormData({ meterCompanyName: '', meterNo: '' });
      setEditingId(null);
      fetchMeters();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleEdit = (meter) => {
    setFormData({ meterCompanyName: meter.meterCompanyName, meterNo: meter.meterNo });
    setEditingId(meter.id);
    setReportModalOpen(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this meter?')) {
      try {
        await axios.delete(`http://localhost:8080/api/meter-register/${id}`);
        alert('Meter deleted successfully!');
        fetchMeters();
      } catch (error) {
        console.error('Error deleting meter:', error);
      }
    }
  };

  const toggleReportModal = () => {
    setReportModalOpen((prev) => !prev);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ boxShadow: 3, borderRadius: 2, padding: 4, backgroundColor: '#fff', marginTop: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#3f51b5', fontFamily: 'sans' }}>
            Meter Registration
          </Typography>
          <IconButton color="primary" onClick={toggleReportModal}>
            <Visibility />
          </IconButton>
        </Box>
        <form onSubmit={handleSubmit} noValidate>
          <TextField
            label="Meter Company Name"
            variant="outlined"
            fullWidth
            name="meterCompanyName"
            value={formData.meterCompanyName}
            onChange={handleChange}
            sx={{ marginBottom: 3 }}
          />
          <TextField
            label="Meter No"
            variant="outlined"
            fullWidth
            name="meterNo"
            value={formData.meterNo}
            onChange={handleChange}
            sx={{ marginBottom: 3 }}
          />
          <Box sx={{ textAlign: 'center' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ width: '200px', textTransform: 'none', fontWeight: 'bold' }}
            >
              {editingId ? 'Update' : 'Submit'}
            </Button>
          </Box>
        </form>
      </Box>

      <Modal
  open={reportModalOpen}
  onClose={toggleReportModal}
  aria-labelledby="meter-report-title"
  aria-describedby="meter-report-description"
>
  <Box
    sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: { xs: '100%', md: '70%' },
      maxHeight: '80vh',
      overflowY: 'auto',
      bgcolor: 'background.paper',
      boxShadow: 24,
      p: 4,
      borderRadius: 2,
    }}
  >
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 2,
        textAlign: 'center',
      }}
    >
      <WaterDropIcon sx={{ color: '#00bcd4', marginRight: 1 }} />
      <Typography variant="h5" sx={{ fontWeight: '600', fontFamily: 'serif' }}>
        Water Billing Management System
      </Typography>
    </Box>
    <Typography id="meter-report-title" variant="h6" sx={{ marginBottom: 2 }}>
      Meter Registration Report
    </Typography>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ backgroundColor: '#4c768d', color: 'white' }}>ID</TableCell>
            <TableCell style={{ backgroundColor: '#4c768d', color: 'white' }}>Company Name</TableCell>
            <TableCell style={{ backgroundColor: '#4c768d', color: 'white' }}>Meter No</TableCell>
            <TableCell style={{ backgroundColor: '#4c768d', color: 'white' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {meters.map((meter) => (
            <TableRow key={meter.id}>
              <TableCell>{meter.id}</TableCell>
              <TableCell>{meter.meterCompanyName}</TableCell>
              <TableCell>{meter.meterNo}</TableCell>
              <TableCell>
                <IconButton color="primary" onClick={() => handleEdit(meter)}>
                  <Edit />
                </IconButton>
                <IconButton color="secondary" onClick={() => handleDelete(meter.id)}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
</Modal>
    </Container>
  );
};

export default MeterRegNoForm;
