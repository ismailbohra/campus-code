import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Paper, IconButton, Snackbar, Alert, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Delete } from '@mui/icons-material';
import axiosInstance from '../../../utils/axiosInstance'; // Make sure axiosInstance is properly configured
import { toast } from 'react-toastify';

const ClientListPage = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);

  useEffect(() => {
    // Fetch clients on page load
    const fetchClients = async () => {
      try {
        const response = await axiosInstance.get('/client');
        setClients(response.data.data);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    fetchClients();
  }, []);

  const handleDeleteClick = (clientId) => {
    setClientToDelete(clientId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axiosInstance.delete(`/client/${clientToDelete}`);
      setClients(clients.filter(client => client._id !== clientToDelete));
      setDeleteDialogOpen(false);
      toast.success("Client deleted successfully!")
    } catch (error) {
      console.error('Error deleting client:', error);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setClientToDelete(null);
  };
  const handleAddClient = () => {
    navigate('../add-client');
  };
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Client List
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button variant="contained" color="primary" onClick={handleAddClient}>
          Add Client
        </Button>
      </Box>
      <Grid container spacing={2}>
        {clients.map((client) => (
          <Grid item xs={12} sm={6} md={4} key={client._id}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
              <IconButton
                onClick={() => handleDeleteClick(client._id)}
                sx={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  color: 'red',
                }}
              >
                <Delete />
              </IconButton>
              <img
                src={client.imageUrl}
                alt={client.name}
                width={100}
                height={100}
                style={{ objectFit: 'cover', borderRadius: '50%' }}
              />
              <Typography variant="h6" sx={{ mt: 2 }}>
                {client.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {client.designation}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                {client.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography variant="body2">Are you sure you want to delete this client?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ClientListPage;
