import React, { useState, useEffect } from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CustomTable from "../../../component/CustomTable";
import axiosInstance from "../../../utils/axiosInstance";
import DeleteIcon from "@mui/icons-material/Delete";

const ProjectsPage = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axiosInstance.get("/project");
        const projectData = response.data.data.map((project) => ({
          id: project._id,
          name: project.name,
          location: project.description,
          image: project.imageUrl,
        }));
        setProjects(projectData);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleDelete = async (projectId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );
    if (!isConfirmed) return;

    try {
      await axiosInstance.delete(`/project/${projectId}`);
      setProjects(projects.filter((project) => project.id !== projectId));
      console.log("Project deleted successfully");
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const columns = [
    {
      accessorKey: "name",
      header: "Project Name",
    },
    {
      accessorKey: "location",
      header: "Description",
    },
    {
      accessorKey: "image",
      header: "Image",
      Cell: ({ row }) => (
        <img
          src={row.original.image}
          alt={row.original.name}
          width="50"
          height="50"
        />
      ),
    },
    {
      accessorKey: "delete",
      header: "Actions",
      Cell: ({ row }) => (
        <IconButton
          onClick={() => handleDelete(row.original.id)}
          color="error"
          aria-label="delete project"
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Projects
      </Typography>

      {/* Add Button to navigate to add project page */}
      <Box sx={{ my: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("../add-project")}
        >
          Add New Project
        </Button>
      </Box>

      {/* Reusable Custom Table */}
      {!loading ? (
        <CustomTable columns={columns} data={projects} />
      ) : (
        <Typography variant="h6">Loading projects...</Typography>
      )}
    </Box>
  );
};

export default ProjectsPage;
