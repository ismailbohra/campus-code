import { Facebook, Instagram, LinkedIn, Twitter } from "@mui/icons-material";
import {
    Box,
    Button,
    Container,
    Grid,
    IconButton,
    Link,
    TextField,
    Typography,
} from "@mui/material";
import React from "react";
import footerLogo from "../assets/pre/images/logo.svg";
import footerimg from "../assets/pre/images/Rectangle.svg";
import Subscribe from "./subscribe";

export default function Footer() {
  return (
    <>
      <Box position="relative" sx={{ overflow: "hidden" }}>
        {/* Background Image */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${footerimg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: -2,
          }}
        />

        {/* Dark Overlay */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Black overlay with 50% opacity
            zIndex: -1,
          }}
        />

        {/* Content Over the Background */}
        <Box
          sx={{
            height: "400px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            color: "#fff",
            textAlign: "center",
          }}
        >
          <Container maxWidth="md">
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
              Learn more about our listing process, as well as our additional
              staging and design work.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{
                backgroundColor: "#fff",
                color: "primary.main",
                fontWeight: "bold",
                borderRadius: 1,
                paddingX: 3,
                paddingY: 1,
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                },
              }}
            >
              LEARN MORE
            </Button>
          </Container>
        </Box>
      </Box>
      <Subscribe/>
      <Box sx={{ backgroundColor: "#001f3f", py: 3 }}>
        <Box maxWidth={"lg"} mx={"auto"}>
          <Grid
            container
            spacing={3}
            alignItems="center"
            justifyContent="space-between"
          >
            {/* Left - All Rights Reserved */}
            <Grid item xs={12} md={4} textAlign={{ xs: "center", md: "left" }}>
              <Typography variant="body2" color="white">
                © All Rights Reserved 2023
              </Typography>
            </Grid>

            {/* Center - Company Name */}
            <Grid item xs={12} md={4} textAlign="center">
            <img
                src={footerLogo} // Your logo file
                alt="Company Logo"
                style={{
                  maxWidth: "200px", // Adjust size as necessary
                  height: "auto",
                  margin: "0 auto",
                }}
              />
            </Grid>

            {/* Right - Social Media Icons */}
            <Grid item xs={12} md={4} textAlign={{ xs: "center", md: "right" }}>
              <IconButton href="#" color="inherit" sx={{ color: "white" }}>
                <Twitter />
              </IconButton>
              <IconButton href="#" color="inherit" sx={{ color: "white" }}>
                <Instagram />
              </IconButton>
              <IconButton href="#" color="inherit" sx={{ color: "white" }}>
                <Facebook />
              </IconButton>
              <IconButton href="#" color="inherit" sx={{ color: "white" }}>
                <LinkedIn />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
