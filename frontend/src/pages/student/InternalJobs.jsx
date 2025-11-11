import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const InternalJobs = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: '100vh', background: '#f9fafb', py: 4 }}>
      <Container maxWidth="lg">
        <Button onClick={() => navigate('/student/dashboard')} sx={{ mb: 2 }}>
          ← Back to Dashboard
        </Button>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 4 }}>
          Internal Job Opportunities
        </Typography>
        <Typography>College-exclusive job listings coming soon...</Typography>
      </Container>
    </Box>
  );
};

export default InternalJobs;
