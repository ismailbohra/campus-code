import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

function ProjectCard({ image, title, description }) {
  return (
    <Card
      sx={{
        width: 230, // Set a minimum width to prevent squeezing
        flexShrink: 0, // Prevent shrinking when more cards are added
        margin: "0 1rem",
        borderRadius: "8px",
        boxShadow: 3,
      }}
    >
      <CardMedia component="img" height="150" image={image} alt={title} sx={{objectFit:'cover'}}/>
      <CardContent sx={{ textAlign: "center" }}>
        <Typography variant="h6" fontWeight="bold" color="primary" gutterBottom>
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ marginBottom: "1rem" }}
        >
          {description}
        </Typography>
        <Button variant="contained" color="warning" size="small">
          READ MORE
        </Button>
      </CardContent>
    </Card>
  );
}


function ProjectSection() {

  const [projects, setProjects] = useState([])

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get('/project');
      setProjects(response.data.data);
    } catch (error) {
      console.error("Error fetching data", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchData()
  }, [])
  

  return (
    <div id="projects">
      <Box sx={{ backgroundColor: "#F8FBFF" }}>
        <Container sx={{ paddingY: "4rem", textAlign: "center" }}>
          {/* Title and Description */}
          <Typography
            variant="h4"
            fontWeight="bold"
            color="primary"
            gutterBottom
          >
            Our Projects
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            sx={{ marginBottom: "2rem" }}
          >
            We know what buyers are looking for and suggest projects that will
            bring clients top dollar for the sale of their homes.
          </Typography>

          {/* Horizontally Scrollable Cards */}
          <Box
            sx={{
              display: "flex",
              overflowX: "auto",
              paddingBottom: "1rem",
              "&::-webkit-scrollbar": { display: "none" }, // Hides scrollbar in Webkit browsers
            }}
          >
            {projects && projects.map((project, index) => (
              <ProjectCard
                key={index}
                image={project.imageUrl}
                title={project.name}
                description={project.description}
              />
            ))}
          </Box>
        </Container>
      </Box>
    </div>
  );
}

export default ProjectSection;
