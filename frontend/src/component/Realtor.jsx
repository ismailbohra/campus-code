import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import realtorsvg from "../assets/Group 1.svg"; // Adjust this path to your SVG
import half_circle from "../assets/pre/shapes/Ellipse 23.svg";
import dots from "../assets/pre/shapes/Group 1.svg";
import light_circle from "../assets/pre/shapes/Ellipse 10.svg";

function Realtor() {
  return (
    <Box position={"relative"}>
      <Grid container spacing={2} alignItems="center">
        {/* Left text section */}
        <Grid
          item
          xs={12}
          md={6}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Box padding={8}>
            <Typography fontWeight="bold" color="primary" variant="h3">
              Not Your Average Realtor
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>
              Real Trust has an eye for seeing a property's potential,
              coordinating design, and effectively marketing to get homeowners
              top dollar on their sales. Real Trust has an eye for seeing a
              property's potential, coordinating design, and effectively
              marketing to get homeowners top dollar on their sales.
            </Typography>
          </Box>
        </Grid>

        {/* Right SVG image section */}
        <Grid item xs={12} md={6} display="flex" justifyContent="flex-end">
          <Box
            component="img"
            src={realtorsvg}
            alt="Realtor Illustration"
            sx={{
              width: "100%",
              height: "auto",
              objectFit: "contain",
              paddingLeft: { xs: 2, md: 0 }, // Padding for xs, reset for larger screens
            }}
          />
        </Grid>
      </Grid>
      <Box
        component="img"
        alt="light Circle Decoration"
        src={light_circle}
        sx={{
          position: "absolute",
          top: { xs: "70px", md: "80px" },
          left: { xs: "40px", md: "80px" },
          width: { xs: 80 },
          height: { xs: 80 },
        }}
      />
    </Box>
  );
}

export default Realtor;
