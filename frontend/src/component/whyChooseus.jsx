import React from "react";
import { Container, Grid, Typography, Box, Stack, Avatar } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import BrushOutlinedIcon from "@mui/icons-material/BrushOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import base_line from "../assets/pre/shapes/Rectangle 58.svg";
import half_circle from "../assets/pre/shapes/Ellipse 23.svg";
import dots from "../assets/pre/shapes/Group 1.svg";

const WhyChooseUs = () => {
  return (
    <div id="services" style={{ position: "relative", paddingTop: 5, paddingBottom: 5 }}>
      <Container maxWidth="md" sx={{ textAlign: "center", my: 10 }}>
        <Typography variant="h4" color="#217BF4" gutterBottom fontWeight={"bold"}>
          Why Choose Us?
        </Typography>
        <Box component="img" alt="Decoration" src={base_line} sx={{ marginBottom: "2rem" }} />

        <Grid container spacing={15}>
          {/* Potential ROI */}
          <Grid item xs={12} md={4}>
            <Stack direction={"column"} gap={3} alignItems={"center"}>
              <Avatar
                sx={{
                  backgroundColor: "#F4F8FF",
                  width: 70,
                  height: 70,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <HomeOutlinedIcon sx={{ fontSize: 40, color: "#217BF4" }} />
              </Avatar>
              <Typography variant="h6" color="#217BF4" fontWeight={"bold"}>
                Potential ROI
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Whether you are looking to buy a fixer-upper or renovate your
                current home for sale, we will walk you through potential
                returns for projects.
              </Typography>
            </Stack>
          </Grid>

          {/* Design */}
          <Grid item xs={12} md={4}>
            <Stack direction={"column"} gap={3} alignItems={"center"}>
              <Avatar
                sx={{
                  backgroundColor: "#F4F8FF",
                  width: 70,
                  height: 70,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <BrushOutlinedIcon sx={{ fontSize: 40, color: "#217BF4" }} />
              </Avatar>
              <Typography variant="h6" color="#217BF4" fontWeight={"bold"}>
                Design
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Our background in interior design makes the perfect guide
                through your design options and coordinating contractors to
                complete the home upgrade.
              </Typography>
            </Stack>
          </Grid>

          {/* Marketing */}
          <Grid item xs={12} md={4}>
            <Stack direction={"column"} gap={3} alignItems={"center"}>
              <Avatar
                sx={{
                  backgroundColor: "#F4F8FF",
                  width: 70,
                  height: 70,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MonetizationOnOutlinedIcon sx={{ fontSize: 40, color: "#217BF4" }} />
              </Avatar>
              <Typography variant="h6" color="#217BF4" fontWeight={"bold"}>
                Marketing
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Staging consultation, professional photos and a sophisticated
                digital marketing plan accompany every listing to reach today’s
                buyers.
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      {/* Half Circle Positioned Half Inside and Half Outside */}
      <Box
        component="img"
        alt="Half Circle Decoration"
        src={half_circle}
        sx={{
          position: "absolute",
          bottom: "0",
          left: "0",
          transform: "translateY(50%)", // Pushes it halfway down outside the section
        }}
      />

      {/* Dots Positioned to Cross Half Circle */}
      <Box
        component="img"
        alt="Dots Decoration"
        src={dots}
        sx={{
          position: "absolute",
          bottom: 0, // Adjust to align with half circle based on size
          left: "20px", // Adjust this to start halfway over the circle's edge
          transform: "translateY(50%)",
          width: {xs :200},
          height: {xs :200},
        }}
      />
    </div>
  );
};

export default WhyChooseUs;
