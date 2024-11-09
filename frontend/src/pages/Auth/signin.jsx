import React, { useEffect, useState } from "react";
import { TextField, Button, Grid, Typography, Paper, Box } from "@mui/material";
import couple from "../../assets/pre/images/young-couple-examining-blueprints-with-real-estate-agent-while-buying-new-home 1.svg";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    toast(
      <div>
        email: admin@gmail.com <br /> password: Admin@123
      </div>,
      {
        autoClose: 5000,
        closeOnClick: true,
        dangerouslySetInnerHTML: true,
      }
    );
  }, []);

  const handleFocus = () => {
    toast(
      <div>
        email: admin@gmail.com <br /> password: Admin@123
      </div>,
      {
        autoClose: 5000,
        closeOnClick: true,
        dangerouslySetInnerHTML: true,
      }
    );
  };

  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);

    const credentials = { email, password };

    try {
      const response = await axiosInstance.post("/user/login", credentials);

      const token = response.data.token;

      localStorage.setItem("authToken", token);

      navigate("/admin");
      setLoading(false);
    } catch (error) {
      console.error("Login failed", error);
      setLoading(false);
    }
  };

  return (
    <Grid
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
              Sign In
            </Typography>
            <form onSubmit={handleSignIn}>
              <Box mb={2}>
                <TextField
                  label="Email"
                  fullWidth
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={handleFocus}
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
                  onFocus={handleFocus}
                />
              </Box>
              <Box mb={2}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={loading}
                >
                  {loading ? "Signing In..." : "Sign In"}
                </Button>
              </Box>
              <Typography variant="body2" align="center">
                Don't have an account?{" "}
                <Button onClick={() => navigate("/signUp")} color="primary">
                  Sign Up
                </Button>
              </Typography>
            </form>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default SignIn;
