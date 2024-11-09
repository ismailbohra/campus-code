import React, { useState } from "react";
import { TextField, Button, Grid, Typography, Paper, Box } from "@mui/material";
import couple from "../../assets/pre/images/young-couple-examining-blueprints-with-real-estate-agent-while-buying-new-home 1.svg";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axiosInstance";

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await axiosInstance.post("/user", {
        name,
        email,
        password,
      });

      toast.success("Registration successful!");
      navigate("/signin");
    } catch (error) {
      console.error("Error during registration", error);
    }
  };

  return (
    <Grid
      position={"relative"}
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh" }}
    >
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
      ></Box>
      <Grid item xs={12} sm={6} md={4} padding={3}>
        <Paper elevation={3} sx={{ padding: 3, borderRadius: 5 }}>
          <Box display={"flex"} flexDirection={"column"} gap={2}>
            <Typography variant="h5" fontWeight={"bold"} align="center">
              Sign Up
            </Typography>
            <form onSubmit={handleSignUp}>
              <Box mb={2}>
                <TextField
                  label="Name"
                  fullWidth
                  variant="outlined"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Box>
              <Box mb={2}>
                <TextField
                  label="Email"
                  fullWidth
                  variant="outlined"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Box>
              <Box mb={2}>
                <TextField
                  label="Password"
                  type="password"
                  fullWidth
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Box>
              <Box mb={2}>
                <TextField
                  label="Confirm Password"
                  type="password"
                  fullWidth
                  variant="outlined"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Box>
              <Box mb={2}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Sign Up
                </Button>
              </Box>
              <Typography variant="body2" align="center">
                Already have an account?{" "}
                <Button onClick={() => navigate("/signin")} color="primary">
                  Sign In
                </Button>
              </Typography>
            </form>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default SignUp;
