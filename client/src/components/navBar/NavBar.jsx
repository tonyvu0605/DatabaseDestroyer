import React, { useState } from 'react';
import Iconify from 'components/iconify';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from 'reduxes/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from 'reduxes/darkModeSlice';

import {
  Box,
  Menu,
  Avatar,
  AppBar,
  Button,
  Tooltip,
  Toolbar,
  MenuItem,
  Typography,
  IconButton, ListItemIcon,
} from '@mui/material';

import './navBar.scss';

// ----------------------------------------------------------------------

function NavBar() {
  const dispatch = useDispatch();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const darkMode = useSelector((state) => state.darkMode);
  const currentUser = useSelector((state) => state.auth.currentUser);

  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate(`/`);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogoutClick = async () => {
    await dispatch(logoutUser());
    navigate('/login');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const handleDarkModeClick = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <div className="NavBar">
      <AppBar elevation={0}>
        <Toolbar className="Navbar__Container">
          <Button onClick={handleHomeClick} className="NavBar__Button">
            <img src="/assets/ddLogoFavEdit.svg" className="NavBar__Button__Logo" alt="Database Destroyer Logo"/>
            <Typography variant="h5" className="NavBar__Button__Title" sx={{color: 'text.primary'}}>
              Database Destroyer
            </Typography>
          </Button>

          <Box sx={{ flexGrow: 1 }} />

          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleDarkModeClick}>
                <ListItemIcon>
                  {darkMode ?
                  <Iconify icon="tdesign:mode-light"/>
                    :
                    <Iconify icon="tdesign:mode-dark"/>
                  }
                </ListItemIcon>
                <Typography textAlign="center">{darkMode ? 'Light Mode' : 'Dark Mode'}</Typography>
              </MenuItem>

              {currentUser ? (
                <MenuItem onClick={handleLogoutClick}>
                  <ListItemIcon>
                    <Iconify icon="material-symbols:logout"/>
                  </ListItemIcon>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              ) : (
                <>
                  <MenuItem onClick={handleLoginClick}>
                    <ListItemIcon>
                      <Iconify icon="material-symbols:login"/>
                    </ListItemIcon>
                    <Typography textAlign="center">Login</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleRegisterClick}>
                    <ListItemIcon>
                      <Iconify icon="mdi:register"/>
                    </ListItemIcon>
                    <Typography textAlign="center">Register</Typography>
                  </MenuItem>
                </>
              )}
            </Menu>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default NavBar;
