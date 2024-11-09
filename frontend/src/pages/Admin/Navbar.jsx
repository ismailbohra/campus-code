import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';

const Navbar = ({ toggleDrawer }) => (
  <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
    <Toolbar>
      <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={toggleDrawer}>
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" noWrap component="div">
        Admin Dashboard
      </Typography>
    </Toolbar>
  </AppBar>
);

export default Navbar;
