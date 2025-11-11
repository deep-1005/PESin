import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  AppBar,
  Toolbar
} from '@mui/material';
import {
  School,
  Business,
  People,
  TrendingUp
} from '@mui/icons-material';

const SimpleLandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <School sx={{ fontSize: 50, color: '#667eea' }} />,
      title: 'Digital Portfolio',
      description: 'Create your professional portfolio with skills and projects'
    },
    {
      icon: <TrendingUp sx={{ fontSize: 50, color: '#764ba2' }} />,
      title: 'Smart Matching',
      description: 'Get company recommendations based on your skills'
    },
    {
      icon: <People sx={{ fontSize: 50, color: '#f093fb' }} />,
      title: 'Alumni Network',
      description: 'Connect with alumni for career guidance'
    },
    {
      icon: <Business sx={{ fontSize: 50, color: '#4facfe' }} />,
      title: 'Job Opportunities',
      description: 'Access college-exclusive job postings'
    }
  ];

  const stats = [
    { number: '500+', label: 'Students' },
    { number: '20+', label: 'Companies' },
    { number: '100+', label: 'Alumni' },
    { number: '50+', label: 'Jobs' }
  ];

  return (
    <Box>
      {/* Simple Header */}
      <AppBar 
        position="static" 
        sx={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}
      >
        <Toolbar>
          <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 700 }}>
            🎓 PESin
          </Typography>
          <Button 
            color="inherit" 
            onClick={() => navigate('/login')}
            sx={{ mr: 2 }}
          >
            Login
          </Button>
          <Button 
            variant="contained" 
            onClick={() => navigate('/register')}
            sx={{ 
              background: '#ff9800',
              '&:hover': { background: '#f57c00' }
            }}
          >
            Get Started →
          </Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 10,
          textAlign: 'center'
        }}
      >
        <Container maxWidth="md">
          <Typography 
            variant="h2" 
            sx={{ 
              fontWeight: 800,
              mb: 3,
              fontSize: { xs: '2rem', md: '3rem' }
            }}
          >
            Your Future Starts at <span style={{ color: '#fbbf24' }}>PESin</span>
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 4,
              opacity: 0.95,
              lineHeight: 1.8
            }}
          >
            The ultimate platform for PES students to build portfolios, 
            connect with companies, and launch their careers.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/register')}
              sx={{
                background: 'white',
                color: '#667eea',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                '&:hover': { background: '#f5f5f5' }
              }}
            >
              JOIN NOW
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{
                borderColor: 'white',
                color: 'white',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                '&:hover': { borderColor: 'white', background: 'rgba(255,255,255,0.1)' }
              }}
            >
              LEARN MORE
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Stats Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={3}>
          {stats.map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <Card 
                sx={{ 
                  textAlign: 'center',
                  py: 3,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white'
                }}
              >
                <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>
                  {stat.number}
                </Typography>
                <Typography variant="body1">
                  {stat.label}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Features Section */}
      <Box sx={{ background: '#f9fafb', py: 8 }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h3" 
            sx={{ 
              textAlign: 'center',
              fontWeight: 800,
              mb: 6,
              color: '#1a202c'
            }}
          >
            Why Choose PESin?
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card 
                  sx={{ 
                    height: '100%',
                    textAlign: 'center',
                    p: 3,
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                    }
                  }}
                >
                  <CardContent>
                    <Box sx={{ mb: 2 }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Call to Action */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 8,
          textAlign: 'center'
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 3 }}>
            Ready to Start Your Journey?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Join thousands of PES students building their future today
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/register')}
            sx={{
              background: '#fbbf24',
              color: '#1a202c',
              px: 5,
              py: 2,
              fontSize: '1.2rem',
              fontWeight: 700,
              '&:hover': { background: '#f59e0b' }
            }}
          >
            Get Started for Free
          </Button>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ background: '#1a202c', color: 'white', py: 4, textAlign: 'center' }}>
        <Container>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Made with ❤️ by Team PESin
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            © 2025 PESin - PES University College Portal
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default SimpleLandingPage;
