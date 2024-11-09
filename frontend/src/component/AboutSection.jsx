import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import right_arrow from '../assets/pre/shapes/Subtract-2.svg'
import base_line from '../assets/pre/shapes/Rectangle 58.svg'


function AboutSection() {
  return (
    <Box sx={{position:"relative"}}>
      <Container
        maxWidth="md"
        sx={{ textAlign: "center", paddingY: "4rem", position: "relative" }}
      >
        {/* Title */}
        <Typography variant="h4" fontWeight="bold" sx={{ color: "#217BF4" }}>
          About Us
        </Typography>

        {/* Underline */}
        <Box
          component="img"
          alt="Decoration"
          src={base_line}
          sx={{
            marginTop:"1rem",
            marginBottom:'2rem'
          }}
        />

        {/* Description */}
        <Typography
          variant="body1"
          color="textSecondary"
          paragraph
          sx={{ marginBottom: "2rem" }}
        >
          Fifteen years of experience in real estate, excellent customer service
          and a commitment to work hard, listen and follow through. We provide
          quality service to build relationships with clients and, more
          importantly, maintain those relationships by communicating
          effectively.
        </Typography>

        {/* Button */}
        <Button
          variant="outlined"
          sx={{
            borderColor: "#1976d2",
            color: "#1976d2",
            paddingX: "2rem",
            borderRadius: "8px",
          }}
        >
          LEARN MORE
        </Button>

        {/* Decorative arrows */}
      </Container>
      <Box
        component="img"
        alt="Decoration"
        src={right_arrow}
        sx={{
          position: "absolute",
          bottom: "-104px",
          left: "50px",
        }}
      />
      <Box
        component="img"
        alt="Decoration"
        src={right_arrow}
        sx={{
          position: 'absolute',
          top: "100px",
          right: "50px",
          transform: 'translateY(-50%)',
        }}
      />
    </Box>
  );
}

export default AboutSection;
