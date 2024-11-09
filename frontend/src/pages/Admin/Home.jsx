import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import CustomTable from "../../component/CustomTable";
import axiosInstance from "../../utils/axiosInstance";

const HomePage = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const response = await axiosInstance.get("newsletter");
        const fetchedSubscribers = response.data.data.map(
          (subscriber, index) => ({
            id: index + 1,
            email: subscriber.email,
            subscribedDate: new Date(subscriber.createdAt).toLocaleDateString(),
            _id: subscriber._id, // Ensure the subscriber ID is included
          })
        );
        setSubscribers(fetchedSubscribers);
      } catch (error) {
        console.error("Error fetching subscribers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscribers();
  }, []);

  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(subscribers);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Subscribers");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "subscribers.xlsx");
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setOpenDialog(true);
  };

  const confirmDelete = async () => {
    try {
      // Call the backend API to delete the subscriber
      await axiosInstance.delete(`/newsletter/${deleteId}`);
      setSubscribers(
        subscribers.filter((subscriber) => subscriber._id !== deleteId)
      );
      setOpenDialog(false);
    } catch (error) {
      console.error("Error deleting subscriber:", error);
    }
  };

  const cancelDelete = () => {
    setOpenDialog(false);
  };

  const columns = [
    {
      accessorKey: "id",
      header: "Serial No.",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "subscribedDate",
      header: "Subscribed Date",
    },
    {
      id: "actions",
      header: "Actions",
      Cell: ({ row }) => (
        <IconButton
          onClick={() => handleDelete(row.original._id)} // Pass the _id here
          color="error"
          aria-label="delete subscriber"
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Loading...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Newsletter Subscribers
      </Typography>

      {/* Download Button */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleDownloadExcel}
          endIcon={<DownloadIcon />}
        >
          Download Excel
        </Button>
      </Box>

      {/* CustomTable to display subscribers */}
      <CustomTable columns={columns} data={subscribers} />

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={cancelDelete}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this subscriber?
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default HomePage;
