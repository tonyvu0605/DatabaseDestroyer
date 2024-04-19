import React from 'react';
import Iconify from 'components/iconify';
import { useLocation, useNavigate } from 'react-router-dom';

import { Box, List, ListItemText, ListItemIcon, ListItemButton } from '@mui/material';

import "./navColumn.scss"

const NavColumn = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: <Iconify icon='iconamoon:home'/> },
    { path: '/player', label: 'Player', icon: <Iconify icon='tabler:user-search'/> },
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Box className="NavColumn" sx={{backgroundColor: 'background.paper'}}>
      <List component="nav">
        {navItems.map((item) => (
          <ListItemButton
            key={item.path}
            selected={location.pathname === item.path}
            onClick={() => handleNavigation(item.path)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default NavColumn;