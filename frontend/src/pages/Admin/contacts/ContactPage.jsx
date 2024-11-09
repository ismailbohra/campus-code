import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomTable from "../../../component/CustomTable";
import axiosInstance from "../../../utils/axiosInstance";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import * as XLSX from "xlsx";

const ContactFormResponsesPage = () => {
  const [responses, setResponses] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const response = await axiosInstance.get("/contact");
        setResponses(response.data.data);
      } catch (error) {
        console.error("Error fetching responses:", error);
      }
    };
    fetchResponses();
  }, []);

  const columns = [
    {
      accessorKey: "fullname",
      header: "Full Name",
    },
    {
      accessorKey: "email",
      header: "Email Address",
    },
    {
      accessorKey: "mobile",
      header: "Mobile Number",
    },
    {
      accessorKey: "city",
      header: "City",
    },
    {
      id: "actions",
      header: "Actions",

      Cell: ({ row }) => (
        <IconButton
          onClick={() => handleDelete(row.original._id)}
          color="error"
          aria-label="delete project"
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  const handleDownload = () => {
    const worksheet = XLSX.utils.json_to_sheet(responses);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Contacts");
    XLSX.writeFile(workbook, "contact_responses.xlsx");
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setOpenDialog(true);
  };

  const confirmDelete = async () => {
    try {
      await axiosInstance.delete(`/contact/${deleteId}`);
      setResponses(responses.filter((response) => response._id !== deleteId));
      setOpenDialog(false);
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  const cancelDelete = () => {
    setOpenDialog(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Contact Form Responses
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleDownload}
          endIcon={<DownloadIcon />}
        >
          Download Excel
        </Button>
      </Box>

      {/* Reusable Custom Table */}
      <CustomTable columns={columns} data={responses} />

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={cancelDelete}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this contact response?
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

export default ContactFormResponsesPage;
