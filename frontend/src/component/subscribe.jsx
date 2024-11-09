import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstance"; 

export default function ResponsiveNavbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubscribe = async () => {
    if (!email) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      const response = await axiosInstance.post("/newsletter/subscribe", { email });
      toast.success("Successfully subscribed to the newsletter!");
      setEmail("");
    } catch (error) {
      console.error("Subscription error:", error);
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#007bff", padding: 1 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "flex-start" : "center",
          gap: 2,
          padding: 2,
        }}
      >
        <Stack
          direction={isMobile ? "column" : "row"}
          spacing={isMobile ? 1 : 3}
          sx={{ flexGrow: 1, alignItems: isMobile ? "flex-start" : "center" }}
        >
          <Button color="inherit" sx={{ justifyContent: "flex-start" }}>
            Home
          </Button>
          <Button color="inherit" sx={{ justifyContent: "flex-start" }}>
            Services
          </Button>
          <Button color="inherit" sx={{ justifyContent: "flex-start" }}>
            Projects
          </Button>
          <Button color="inherit" sx={{ justifyContent: "flex-start" }}>
            Testimonials
          </Button>
          <Button color="inherit" sx={{ justifyContent: "flex-start" }}>
            Contact
          </Button>
        </Stack>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "transparent",
            border: "1px solid white",
            borderRadius: "10px",
            overflow: "hidden",
            width: "fit-content",
          }}
        >
          <TextField
            variant="outlined"
            placeholder="Enter Email Address"
            InputProps={{
              style: { color: "white" },
            }}
            value={email}
            type="email"
            onChange={handleEmailChange}
            sx={{
              bgcolor: "transparent",
              borderRadius: 0,
              input: { padding: "10px 16px", color: "white" },
              "& fieldset": { border: "none" },
              "& input::placeholder": { color: "white", opacity: 1 },
              minWidth: 200,
            }}
          />
          <Button
            variant="contained"
            onClick={handleSubscribe}
            sx={{
              borderRadius: 0,
              padding: "10px 16px",
              backgroundColor: "white",
              color: "#007bff",
              "&:hover": { backgroundColor: "#e0e0e0" },
            }}
          >
            Subscribe
          </Button>
        </Box>
      </Box>
    </AppBar>
  );
}
