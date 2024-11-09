import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import couple from "../assets/pre/images/young-couple-examining-blueprints-with-real-estate-agent-while-buying-new-home 1.svg";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";

function HeroSection() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    mobile: "",
    city: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/contact", formData);
      toast.success("Consultation request submitted successfully!");
      setFormData({
        fullname: "",
        email: "",
        mobile: "",
        city: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box id="home" sx={{ position: "relative" }}>
      <Box
        sx={{
          backgroundImage: `url(${couple})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          padding: 0,
          filter: "brightness(50%)",
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          zIndex: -1000,
        }}
      />
      <Container sx={{ paddingInline: "2rem", paddingY: "5rem" }}>
        <Grid
          container
          spacing={4}
          alignItems="center"
          justifyContent="space-around"
        >
          {/* Left Side - Text and Call to Action */}
          <Grid item xs={12} md={7}>
            <Typography variant="h3" fontWeight="bold" color="white">
              Consultation, Design, & Marketing
            </Typography>
            <Typography
              variant="body1"
              sx={{ marginTop: "1rem", color: "white" }}
            >
              Find your dream home with ease - Explore our diverse range of
              properties and discover the perfect one for you!
            </Typography>
            <Box sx={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#ff5722",
                  color: "white",
                  fontWeight: "bold",
                  borderRadius: "5px",
                  "&:hover": { backgroundColor: "#e64a19" },
                }}
              >
                Get Started
              </Button>
              <Button
                variant="outlined"
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  borderRadius: "5px",
                }}
                color="#ff5722"
              >
                Learn more
              </Button>
            </Box>
          </Grid>

          {/* Right Side - Form */}
          <Grid item xs={12} md={4}>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                backgroundColor: "rgba(48, 62, 109, 0.8)",
                padding: "2rem",
                borderRadius: "8px",
                color: "white",
                position: "relative",
                border: "2px solid white",
              }}
            >
              <Typography variant="h5" fontWeight="bold" mb={2}>
                Get a Free Consultation
              </Typography>
              <TextField
                fullWidth
                label="Full Name"
                variant="filled"
                name="fullname"
                value={formData.fullname}
                required
                onChange={handleInputChange}
                sx={{
                  backgroundColor: "white",
                  marginBottom: "1rem",
                  borderRadius: "4px",
                }}
              />
              <TextField
                fullWidth
                label="Enter Email Address"
                variant="filled"
                name="email"
                value={formData.email}
                required
                onChange={handleInputChange}
                sx={{
                  backgroundColor: "white",
                  marginBottom: "1rem",
                  borderRadius: "4px",
                }}
              />
              <TextField
                fullWidth
                type="number"
                label="Mobile Number"
                variant="filled"
                name="mobile"
                value={formData.mobile}
                required
                onChange={handleInputChange}
                sx={{
                  backgroundColor: "white",
                  marginBottom: "1rem",
                  borderRadius: "4px",
                }}
              />
              <TextField
                fullWidth
                label="Area, City"
                variant="filled"
                name="city"
                value={formData.city}
                required
                onChange={handleInputChange}
                sx={{
                  backgroundColor: "white",
                  marginBottom: "1rem",
                  borderRadius: "4px",
                }}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "#ff5722",
                  color: "white",
                  fontWeight: "bold",
                  borderRadius: "5px",
                  "&:hover": { backgroundColor: "#e64a19" },
                }}
                fullWidth
              >
                Get Quick Quote
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default HeroSection;
