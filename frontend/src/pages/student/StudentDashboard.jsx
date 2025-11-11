import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { Dashboard, Person, Business, Work, Assignment, People } from '@mui/icons-material';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const menuItems = [
    { title: 'My Profile', icon: <Person />, path: '/student/profile', color: '#ff6b35' },
    { title: 'Student Directory', icon: <People />, path: '/student/directory', color: '#10b981' },
    { title: 'Company Recommendations', icon: <Business />, path: '/student/recommendations', color: '#1e88e5' },
    { title: 'College Opportunities', icon: <Work />, path: '/student/college-jobs', color: '#f7931e' },
    { title: 'My Applications', icon: <Assignment />, path: '/student/applications', color: '#42a5f5' },
  ];

  return (
    <Box className="mesh-gradient" sx={{ minHeight: '100vh', position: 'relative' }}>
      {/* Floating Orbs */}
      <Box className="orb orb-orange" sx={{ width: '400px', height: '400px', top: '-100px', right: '-100px', position: 'fixed' }} />
      <Box className="orb orb-blue" sx={{ width: '350px', height: '350px', bottom: '-80px', left: '-80px', position: 'fixed' }} />

      <Container maxWidth="lg" sx={{ py: 6, position: 'relative', zIndex: 1 }}>
        {/* Header with Glassmorphism */}
        <Box 
          className="glass-effect"
          sx={{ 
            mb: 6, 
            p: 4,
            borderRadius: 5,
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2
          }}
        >
          <Box>
            <Typography 
              variant="h3" 
              className="gradient-text"
              sx={{ 
                fontWeight: 900,
                mb: 1,
                fontSize: { xs: '2rem', md: '3rem' }
              }}
            >
              Student Dashboard
            </Typography>
            <Typography variant="h6" sx={{ color: '#64748b', fontWeight: 500 }}>
              Welcome back, <span style={{ fontWeight: 700, color: '#ff6b35' }}>{user?.firstName}</span>! 🚀
            </Typography>
          </Box>
          <Button 
            variant="outlined" 
            color="error" 
            onClick={logout}
            startIcon={<Dashboard />}
            sx={{
              borderRadius: '50px',
              px: 4,
              py: 1.5,
              fontWeight: 700,
              borderWidth: '2px',
              '&:hover': {
                borderWidth: '2px',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 20px rgba(239, 68, 68, 0.3)'
              }
            }}
          >
            Logout
          </Button>
        </Box>

        <Grid container spacing={4}>
          {menuItems.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
              <Box
                component={motion.div}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -15, scale: 1.03 }}
                onClick={() => navigate(item.path)}
                sx={{ cursor: 'pointer', height: '100%' }}
              >
                <Card
                  className="glass-effect card-3d"
                  sx={{
                    height: '100%',
                    borderRadius: 5,
                    background: 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(20px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '5px',
                      background: `linear-gradient(90deg, ${item.color}, ${item.color}aa)`,
                    },
                    '&:hover': {
                      boxShadow: `0 20px 60px 0 ${item.color}50`,
                      border: `1px solid ${item.color}80`,
                    }
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', py: 6 }}>
                    <Box 
                      sx={{ 
                        fontSize: 60, 
                        color: item.color, 
                        mb: 3,
                        display: 'inline-flex',
                        p: 3,
                        borderRadius: 4,
                        background: `linear-gradient(135deg, ${item.color}15, ${item.color}30)`,
                        boxShadow: `0 8px 24px ${item.color}30`,
                        transition: 'all 0.3s',
                        '&:hover': {
                          transform: 'rotate(10deg) scale(1.1)',
                          boxShadow: `0 12px 32px ${item.color}50`
                        }
                      }}
                    >
                      {item.icon}
                    </Box>
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        fontWeight: 800,
                        background: `linear-gradient(135deg, ${item.color}, ${item.color}aa)`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}
                    >
                      {item.title}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default StudentDashboard;
