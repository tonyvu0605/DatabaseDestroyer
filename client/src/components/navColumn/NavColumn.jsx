import React from 'react';
import Iconify from 'components/iconify';
import { useLocation, useNavigate } from 'react-router-dom';

import { Box, List, ListItemText, ListItemIcon, ListItemButton } from '@mui/material';

import './navColumn.scss';

const NavColumn = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: <Iconify icon="iconamoon:home" /> },
    { path: '/player', label: 'Player', icon: <Iconify icon="tabler:user-search" /> },
    { path: '/team', label: 'Team', icon: <Iconify icon="fluent:people-team-32-regular" /> },
    {
      path: '/highScoringGame',
      label: 'High Scoring Game',
      icon: <Iconify icon="game-icons:basketball-basket" />,
    },
    {
      path: '/teamSalaries',
      label: 'Team Salaries By Year',
      icon: <Iconify icon="fluent:people-money-24-regular" />,
    },
    {
      path: '/PlayerSalaries',
      label: 'Player Salaries By Year',
      icon: <Iconify icon="fluent:receipt-money-24-regular" />,
    },
    {
      path: '/teamPerformance',
      label: 'Team Performance',
      icon: <Iconify icon="grommet-icons:document-performance" />,
    },
    {
      path: '/seasonalPointsAverage',
      label: 'Seasonal Points Average',
      icon: <Iconify icon="fluent:calendar-arrow-counterclockwise-48-regular" />,
    },
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Box className="NavColumn" sx={{ backgroundColor: 'background.paper' }}>
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
