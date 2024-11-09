import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import avatar1 from "../assets/pre/images/Ellipse 11.svg";
import avatar2 from "../assets/pre/images/Ellipse 12.svg";
import avatar3 from "../assets/pre/images/Ellipse 13.svg";
import avatar4 from "../assets/pre/images/Ellipse 28.svg";
import axiosInstance from "../utils/axiosInstance";

function TestimonialCard({ image, message, name, role }) {
  return (
    <Card
      sx={{
        width: 230,
        margin: "0 1rem",
        borderRadius: "8px",
        boxShadow: 3,
        textAlign: "center",
        padding: ".5rem",
        flexShrink: 0,
      }}
    >
      <Avatar
        src={image}
        alt={name}
        sx={{
          width: 80,
          height: 80,
          margin: "0 auto",
          marginBottom: "1rem",
        }}
      />
      <CardContent>
        <Typography
          variant="body1"
          color="textSecondary"
          sx={{ marginBottom: "1rem" }}
        >
          {message}
        </Typography>
        <Typography variant="h6" fontWeight="bold" color="primary">
          {name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {role}
        </Typography>
      </CardContent>
    </Card>
  );
}


function TestimonialsSection() {

  const [testimonials, settestimonials] = useState([])

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get('/client');
      settestimonials(response.data.data);
    } catch (error) {
      console.error("Error fetching data", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchData()
  }, [])


  return (
    <div id="clients" style={{backgroundColor:"#F8FBFF"}}>
    <Container sx={{ paddingY: "4rem", textAlign: "center",marginy:5 }}>
      {/* Title */}
      <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
        Happy Clients
      </Typography>
      <Box
        sx={{
          marginTop: "4rem",
          display: "flex",
          overflowX: "auto",
          paddingBottom: "1rem",
          "&::-webkit-scrollbar": { display: "none" }, // Hide scrollbar
        }}
      >
        {testimonials && testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={index}
            image={testimonial.imageUrl}
            message={testimonial.description}
            name={testimonial.name}
            role={testimonial.designation}
          />
        ))}
      </Box>
    </Container>
    </div>
  );
}

export default TestimonialsSection;
