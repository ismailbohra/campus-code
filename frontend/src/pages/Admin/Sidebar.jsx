import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Divider,
  IconButton,
  ListItemIcon,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import WorkIcon from "@mui/icons-material/Work";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import StickyNote2Icon from '@mui/icons-material/StickyNote2';

const drawerWidth = 240;
const collapsedWidth = 0;

const Sidebar = ({ open, toggleDrawer }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // Check if the screen width is below 'md' breakpoint

  const handleLogout = () => {
    localStorage.clear()
    navigate("/signin"); // Redirect to login page after logout
  };

  const menuItems = [
    { text: "Home", icon: <HomeIcon />, path: "/admin" },
    { text: "Clients", icon: <InfoIcon />, path: "/admin/clients" },
    { text: "Projects", icon: <WorkIcon />, path: "/admin/projects" },
    { text: "Contact Forms", icon: <StickyNote2Icon />, path: "/admin/contactFormResponse" },
    { text: "Logout", icon: <ExitToAppIcon />, action: handleLogout },
  ];

  return (
    <Drawer
      variant={isMobile ? "temporary" : "persistent"} // 'temporary' for mobile, 'persistent' for desktop
      open={open}
      onClose={toggleDrawer}
      sx={{
        width: open ? drawerWidth : collapsedWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: open ? drawerWidth : collapsedWidth,
          boxSizing: "border-box",
          transition: "width 0.3s",
        },
      }}
    >
      <Toolbar>
        {open && (
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        )}
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={
              item.action ||
              (() => {
                if(isMobile){
                  toggleDrawer()
                }
                navigate(item.path);
              })
            }
            sx={{ justifyContent: open ? "initial" : "center" }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
