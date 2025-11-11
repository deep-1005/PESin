import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const JobList = () => {
  return (
    <Box sx={{ minHeight: '100vh', background: '#f9fafb', py: 4 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 4 }}>
          Job Opportunities
        </Typography>
        <Typography>Job listings coming soon...</Typography>
      </Container>
    </Box>
  );
};

export default JobList;
