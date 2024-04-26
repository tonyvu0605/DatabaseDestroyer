import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from 'reduxes/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { CustomAlert } from 'components/customMUIComponents';

import Box from '@mui/material/Box';
import { Link, Button, Divider, Container, TextField, Typography } from '@mui/material';

import './registerView.scss';

// ----------------------------------------------------------------------

const RegisterView = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { error, loading } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(registerUser({ email, password, confirmPassword }));

    if (!error) {
      navigate('/login');
    }
  };

  return (
    <div className="register-view">
      <img
        src="/assets/goldenHourBasketball.jpg"
        alt="Golden Hour Basketball"
        className="register-view__image"
      />
      <Container>
        <Box className="register-view__container">
          <Typography variant="h4" className="register-view__title">
            Register
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

            <TextField
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </Button>
          </form>

          <div className="register-view__divider">
            <Divider sx={{ borderColor: 'primary.main' }} />
          </div>

          <Link href="/login" variant="caption" className="register-view__login-link">
            Already have an account?
          </Link>

          <CustomAlert sx={{ padding: 1 }} error={error} severity="error" />
        </Box>
      </Container>
    </div>
  );
};

export default RegisterView;
