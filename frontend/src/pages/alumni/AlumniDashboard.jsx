import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AlumniDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <Box sx={{ minHeight: '100vh', background: '#f9fafb', py: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h3" sx={{ fontWeight: 800 }}>
            Alumni Dashboard
          </Typography>
          <Button variant="outlined" color="error" onClick={logout}>
            Logout
          </Button>
        </Box>
        <Typography variant="h5" sx={{ mb: 4 }}>
          Welcome, {user?.firstName}! 👋
        </Typography>
        <Typography>Alumni features coming soon...</Typography>
      </Container>
    </Box>
  );
};

export default AlumniDashboard;
