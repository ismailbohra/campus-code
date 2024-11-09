import React, { useEffect, useState } from 'react';
import { Box, CssBaseline, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    if(!isMobile){
      setDrawerOpen(true)
    }
  }, [])
  

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };



  return (
    <Box sx={{ display: 'flex'}}>
      <CssBaseline />
      <Navbar toggleDrawer={toggleDrawer} />
      <Sidebar open={drawerOpen} toggleDrawer={toggleDrawer} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width:'100%'
        }}
      >
        <Toolbar />
        <Outlet/>
      </Box>
    </Box>
  );
};

export default AdminLayout;
