import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import footerLogo from "../assets/pre/images/logo.svg";
import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const menuItems = [
    { name: "HOME", id: "home" },
    { name: "SERVICES", id: "services" },
    { name: "PROJECTS", id: "projects" },
    { name: "CLIENTS", id: "clients" },
  ];


  const navigate = useNavigate()
  const handleSignInClick = () => {
    navigate("/signin");
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "white",
        boxShadow: "none",
        borderBottom: "1px solid #e0e0e0",
        paddingY: 2,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo Section */}
        <Box display="flex" alignItems="center">
          <img
            src={footerLogo}
            alt="Company Logo"
            style={{
              maxWidth: "200px",
              height: "auto",
              margin: "0 auto",
            }}
          />
        </Box>

        {/* Desktop Links */}
        {!isMobile && (
          <Box display="flex" alignItems="center" gap={3}>
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.id}
                smooth={true}
                duration={500}
                offset={-70} // Adjust offset if needed for header height
                style={{
                  textDecoration: "none",
                  color: index === 0 ? "#1e88e5" : "#424242",
                  fontWeight: index === 0 ? "bold" : "normal",
                  cursor: "pointer",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    "&:hover": {
                      color: "#1e88e5",
                    },
                  }}
                >
                  {item.name}
                </Typography>
              </Link>
            ))}
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#ff5722",
                borderRadius: "20px",
                color: "white",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#e64a19",
                },
              }}
              onClick={handleSignInClick}
            >
              Sign In
            </Button>
          </Box>
        )}

        {/* Mobile Menu Icon */}
        {isMobile && (
          <>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
            >
              <MenuIcon sx={{ color: "#424242" }} />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={handleDrawerToggle}
            >
              <Box
                sx={{ width: 250 }}
                role="presentation"
                onClick={handleDrawerToggle}
                onKeyDown={handleDrawerToggle}
              >
                <List>
                  {menuItems.map((item, index) => (
                    <ListItem button key={item.name}>
                      <Link
                        to={item.id}
                        smooth={true}
                        duration={500}
                        offset={-70} // Adjust offset for header
                        style={{
                          textDecoration: "none",
                          color: index === 0 ? "#1e88e5" : "#424242",
                          fontWeight: index === 0 ? "bold" : "normal",
                        }}
                        onClick={handleDrawerToggle}
                      >
                        <ListItemText
                          primary={item.name}
                          primaryTypographyProps={{
                            color: index === 0 ? "#1e88e5" : "#424242",
                            fontWeight: index === 0 ? "bold" : "normal",
                          }}
                        />
                      </Link>
                    </ListItem>
                  ))}
                  <ListItem button>
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{
                        backgroundColor: "#ff5722",
                        color: "white",
                        fontWeight: "bold",
                        borderRadius: "20px",
                        "&:hover": {
                          backgroundColor: "#e64a19",
                        },
                      }}
                      onClick={handleSignInClick}
                    >
                      Sign In
                    </Button>
                  </ListItem>
                </List>
              </Box>
            </Drawer>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
