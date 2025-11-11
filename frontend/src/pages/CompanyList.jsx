import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const CompanyList = () => {
  return (
    <Box sx={{ minHeight: '100vh', background: '#f9fafb', py: 4 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 4 }}>
          Companies
        </Typography>
        <Typography>Company listings coming soon...</Typography>
      </Container>
    </Box>
  );
};

export default CompanyList;
