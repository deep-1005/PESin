import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardContent,
  Paper,
  IconButton,
  AppBar,
  Toolbar
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import {
  People,
  Business,
  Work,
  Assessment,
  Logout,
  PersonAdd,
  CheckCircle,
  Pending,
  TrendingUp
} from '@mui/icons-material';
import axios from 'axios';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    pendingApprovals: 0,
    totalCompanies: 0,
    totalJobs: 0,
    totalStudents: 0,
    totalAlumni: 0
  });

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await axios.get('/api/admin/dashboard-stats');
      if (response.data.success) {
        setStats(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    }
  };

  const menuItems = [
    {
      title: 'User Management',
      description: 'Approve and manage user accounts',
      icon: <People sx={{ fontSize: 40 }} />,
      color: '#ff6b35',
      path: '/admin/users',
      stat: `${stats.pendingApprovals} pending`
    },
    {
      title: 'Company Management',
      description: 'Add and manage company profiles',
      icon: <Business sx={{ fontSize: 40 }} />,
      color: '#1e88e5',
      path: '/admin/companies',
      stat: `${stats.totalCompanies} companies`
    },
    {
      title: 'Internal Jobs',
      description: 'Post internal college opportunities',
      icon: <Work sx={{ fontSize: 40 }} />,
      color: '#f7931e',
      path: '/admin/internal-jobs',
      stat: `${stats.totalJobs} jobs`
    },
    {
      title: 'Analytics',
      description: 'View platform statistics and reports',
      icon: <Assessment sx={{ fontSize: 40 }} />,
      color: '#42a5f5',
      path: '/admin/analytics',
      stat: `${stats.totalUsers} total users`
    }
  ];

  const statCards = [
    {
      title: 'Total Students',
      value: stats.totalStudents,
      icon: <PersonAdd sx={{ fontSize: 30 }} />,
      color: '#ff6b35',
      bgColor: 'rgba(255, 107, 53, 0.1)'
    },
    {
      title: 'Total Alumni',
      value: stats.totalAlumni,
      icon: <CheckCircle sx={{ fontSize: 30 }} />,
      color: '#10b981',
      bgColor: 'rgba(16, 185, 129, 0.1)'
    },
    {
      title: 'Pending Approvals',
      value: stats.pendingApprovals,
      icon: <Pending sx={{ fontSize: 30 }} />,
      color: '#f7931e',
      bgColor: 'rgba(247, 147, 30, 0.1)'
    },
    {
      title: 'Active Companies',
      value: stats.totalCompanies,
      icon: <TrendingUp sx={{ fontSize: 30 }} />,
      color: '#1e88e5',
      bgColor: 'rgba(30, 136, 229, 0.1)'
    }
  ];

  return (
    <Box className="mesh-gradient" sx={{ minHeight: '100vh', position: 'relative' }}>
      {/* Floating Orbs */}
      <Box className="orb orb-orange" sx={{ width: '500px', height: '500px', top: '-150px', right: '-100px', position: 'fixed' }} />
      <Box className="orb orb-blue" sx={{ width: '400px', height: '400px', bottom: '-100px', left: '-80px', position: 'fixed' }} />

      {/* App Bar with Glassmorphism */}
      <AppBar 
        position="static" 
        elevation={0}
        sx={{ 
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(30px) saturate(180%)',
          WebkitBackdropFilter: 'blur(30px) saturate(180%)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.08)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          borderTop: 'none'
        }}
      >
        <Toolbar sx={{ py: 1.5 }}>
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <img 
              src="/pesin-logo.jpeg" 
              alt="PESin Logo" 
              style={{ 
                height: '50px', 
                width: '50px', 
                borderRadius: '12px',
                marginRight: '16px',
                objectFit: 'cover',
                boxShadow: '0 8px 24px rgba(255, 107, 53, 0.5)'
              }} 
            />
          </motion.div>
          <Typography 
            variant="h5" 
            className="gradient-text"
            sx={{ flexGrow: 1, fontWeight: 900, letterSpacing: '0.5px' }}
          >
            PESin Admin Panel
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              mr: 3, 
              fontWeight: 600, 
              color: '#1e88e5',
              px: 2,
              py: 1,
              borderRadius: '50px',
              background: 'rgba(255, 255, 255, 0.3)'
            }}
          >
            {user?.firstName} {user?.lastName}
          </Typography>
          <Button
            variant="outlined"
            color="error"
            startIcon={<Logout />}
            onClick={logout}
            sx={{
              borderRadius: '50px',
              px: 3,
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
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 6, position: 'relative', zIndex: 1 }}>
        {/* Welcome Section with Glassmorphism */}
        <Box 
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-effect"
          sx={{ mb: 6, p: 4, borderRadius: 5 }}
        >
          <Typography 
            variant="h3" 
            className="gradient-text"
            sx={{ fontWeight: 900, mb: 1, fontSize: { xs: '2rem', md: '3rem' } }}
          >
            Welcome back, {user?.firstName}! 🎯
          </Typography>
          <Typography variant="h6" sx={{ color: '#64748b', fontWeight: 500 }}>
            Here's what's happening with your platform today
          </Typography>
        </Box>

        {/* Stats Cards with Animation */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          {statCards.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box
                component={motion.div}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.05 }}
              >
                <Paper
                  className="glass-effect"
                  elevation={0}
                  sx={{
                    p: 4,
                    borderRadius: 5,
                    background: 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(20px) saturate(180%)',
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
                      height: '4px',
                      background: `linear-gradient(90deg, ${stat.color}, ${stat.color}aa)`,
                    },
                    '&:hover': {
                      boxShadow: `0 20px 60px 0 ${stat.color}40`,
                      border: `1px solid ${stat.color}60`,
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box>
                      <Typography variant="body2" sx={{ mb: 1, color: '#64748b', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.5px' }}>
                        {stat.title}
                      </Typography>
                      <Typography variant="h3" sx={{ fontWeight: 900, color: stat.color, mb: 0.5 }}>
                        {stat.value}
                      </Typography>
                    </Box>
                    <Box 
                      sx={{ 
                        p: 2, 
                        borderRadius: 3, 
                        background: `linear-gradient(135deg, ${stat.color}15, ${stat.color}30)`,
                        color: stat.color,
                        boxShadow: `0 4px 12px ${stat.color}20`,
                        transition: 'all 0.3s',
                        '&:hover': {
                          transform: 'scale(1.1) rotate(5deg)',
                          boxShadow: `0 8px 20px ${stat.color}40`
                        }
                      }}
                    >
                      {stat.icon}
                    </Box>
                  </Box>
                </Paper>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Menu Cards with Stunning Animation */}
        <Typography 
          variant="h4" 
          className="gradient-text"
          sx={{ fontWeight: 900, mb: 5, textAlign: 'center' }}
        >
          ⚡ Quick Actions
        </Typography>
        <Grid container spacing={4}>
          {menuItems.map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box
                component={motion.div}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
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
                  <CardContent sx={{ p: 4 }}>
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: 4,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: `linear-gradient(135deg, ${item.color}15, ${item.color}30)`,
                        color: item.color,
                        mb: 3,
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
                      variant="h6" 
                      sx={{ 
                        fontWeight: 800, 
                        mb: 1.5,
                        background: `linear-gradient(135deg, ${item.color}, ${item.color}aa)`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#64748b', mb: 2.5, lineHeight: 1.7 }}>
                      {item.description}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: item.color, 
                        fontWeight: 700,
                        background: `linear-gradient(135deg, ${item.color}15, ${item.color}25)`,
                        px: 2,
                        py: 1,
                        borderRadius: '50px',
                        display: 'inline-block',
                        fontSize: '0.75rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        border: `1px solid ${item.color}30`
                      }}
                    >
                      {item.stat}
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

export default AdminDashboard;
