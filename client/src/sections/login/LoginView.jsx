import React, { useState } from 'react';
import { loginUser } from 'reduxes/authSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CustomAlert } from 'components/customMUIComponents';

import Box from '@mui/material/Box';
import { Link, Button, Divider, Container, TextField, Typography } from '@mui/material';

import './loginView.scss';

// ----------------------------------------------------------------------

const LoginView = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { error, loading } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(loginUser({ email, password }));

    if (!error) {
      navigate('/');
    }
  };

  console.log(error);

  return (
    <div className="login-view">
      <img
        src="/assets/goldenHourBasketball.jpg"
        alt="Golden Hour Basketball"
        className="login-view__image"
      />
      <Container>
        <Box className="login-view__container">
          <Typography variant="h4" className="login-view__title">
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
              Login
            </Button>
          </form>

          <div className="login-view__divider">
            <Divider sx={{ borderColor: 'primary.main' }} />
          </div>

          <Link href="/register" variant="caption" className="login-view__register-link">
            Don&apos;t have an account?
          </Link>

          <CustomAlert sx={{ padding: 1 }} error={error} severity="error" />
        </Box>
      </Container>
    </div>
  );
};

export default LoginView;
