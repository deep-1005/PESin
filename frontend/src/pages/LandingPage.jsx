import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  IconButton,
  Stack
} from '@mui/material';
import {
  School,
  Business,
  People,
  EmojiEvents,
  TrendingUp,
  Security,
  Speed,
  Architecture,
  KeyboardArrowRight
} from '@mui/icons-material';

const LandingPage = () => {
  const navigate = useNavigate();
  const heroRef = useRef(null);

  useEffect(() => {
    // Mouse move parallax effect
    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const xPercent = (clientX / innerWidth - 0.5) * 20;
      const yPercent = (clientY / innerHeight - 0.5) * 20;
      
      heroRef.current.style.transform = `translate(${xPercent}px, ${yPercent}px)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    {
      icon: <School sx={{ fontSize: 40 }} />,
      title: 'Digital Portfolio',
      description: 'Create professional portfolios with skills, projects, and certifications',
      color: '#ff6b35'
    },
    {
      icon: <TrendingUp sx={{ fontSize: 40 }} />,
      title: 'Smart Matching',
      description: 'Get personalized company recommendations based on your skillset',
      color: '#1e88e5'
    },
    {
      icon: <People sx={{ fontSize: 40 }} />,
      title: 'Alumni Network',
      description: 'Connect with alumni working in your dream companies for guidance',
      color: '#f7931e'
    },
    {
      icon: <Business sx={{ fontSize: 40 }} />,
      title: 'Internal Jobs',
      description: 'Access exclusive college opportunities like TA, Research roles',
      color: '#ff9800'
    },
    {
      icon: <Speed sx={{ fontSize: 40 }} />,
      title: 'Fast Applications',
      description: 'Apply to multiple companies with a single click',
      color: '#42a5f5'
    },
    {
      icon: <Security sx={{ fontSize: 40 }} />,
      title: 'Secure Platform',
      description: 'Your data is protected with enterprise-grade security',
      color: '#1565c0'
    }
  ];

  const stats = [
    { number: '500+', label: 'Active Students' },
    { number: '20+', label: 'Partner Companies' },
    { number: '100+', label: 'Alumni Network' },
    { number: '50+', label: 'Job Opportunities' }
  ];

  return (
    <Box sx={{ overflowX: 'hidden', position: 'relative' }}>
      {/* Floating Orbs Background */}
      <Box className="orb orb-orange" sx={{ width: '600px', height: '600px', top: '-200px', left: '-100px', position: 'fixed' }} />
      <Box className="orb orb-blue" sx={{ width: '500px', height: '500px', top: '30%', right: '-150px', position: 'fixed' }} />
      <Box className="orb orb-orange" sx={{ width: '400px', height: '400px', bottom: '-100px', left: '30%', position: 'fixed' }} />

      {/* Navigation with Glassmorphism */}
      <AppBar 
        position="fixed" 
        elevation={0}
        sx={{ 
          background: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(30px) saturate(180%)',
          WebkitBackdropFilter: 'blur(30px) saturate(180%)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.08)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          borderTop: 'none'
        }}
      >
        <Toolbar sx={{ py: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
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
              sx={{ 
                fontWeight: 900,
                background: 'linear-gradient(135deg, #ff6b35 0%, #1e88e5 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '1px',
                textShadow: '0 0 30px rgba(255, 107, 53, 0.3)'
              }}
            >
              PESin
            </Typography>
          </Box>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              variant="contained"
              onClick={() => navigate('/login')}
              sx={{ 
                mr: 2, 
                fontWeight: 700,
                color: '#fff',
                px: 4,
                py: 1.2,
                borderRadius: '50px',
                textTransform: 'none',
                fontSize: '16px',
                background: 'linear-gradient(135deg, #1e88e5 0%, #42a5f5 100%)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 20px rgba(30, 136, 229, 0.4)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #1565c0 0%, #1e88e5 100%)',
                  boxShadow: '0 8px 30px rgba(30, 136, 229, 0.6)',
                  transform: 'translateY(-2px)'
                }
              }}
            >
              Login
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="contained"
              onClick={() => navigate('/register')}
              sx={{
                background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
                fontWeight: 700,
                px: 4,
                py: 1.2,
                borderRadius: '50px',
                textTransform: 'none',
                fontSize: '16px',
                boxShadow: '0 8px 30px rgba(255, 107, 53, 0.5)',
                position: 'relative',
                overflow: 'hidden',
                '&:hover': {
                  background: 'linear-gradient(135deg, #e55a2b 0%, #e07e1a 100%)',
                  boxShadow: '0 12px 40px rgba(255, 107, 53, 0.7)',
                  transform: 'translateY(-2px)'
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                  transition: 'left 0.5s'
                },
                '&:hover::before': {
                  left: '100%'
                }
              }}
            >
              Get Started →
            </Button>
          </motion.div>
        </Toolbar>
      </AppBar>

      {/* Hero Section with Animated Gradient */}
      <Box
        className="animated-gradient"
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          pt: 12
        }}
      >
        {/* Animated Particles */}
        <Box 
          ref={heroRef}
          sx={{ 
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            transition: 'transform 0.1s ease-out',
            pointerEvents: 'none'
          }}
        >
          {[...Array(30)].map((_, i) => (
            <Box
              key={i}
              sx={{
                position: 'absolute',
                width: `${Math.random() * 8 + 2}px`,
                height: `${Math.random() * 8 + 2}px`,
                background: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '50%',
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 15 + 15}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`,
                boxShadow: '0 0 20px rgba(255, 255, 255, 0.5)'
              }}
            />
          ))}
        </Box>
        <Box
          sx={{
            position: 'absolute',
            bottom: '5%',
            left: '5%',
            width: 350,
            height: 350,
            borderRadius: '50%',
            background: 'rgba(240, 147, 251, 0.15)',
            animation: 'float 8s ease-in-out infinite reverse',
            boxShadow: '0 0 80px rgba(240, 147, 251, 0.3)'
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '10%',
            left: '10%',
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
            animation: 'float 8s ease-in-out infinite'
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    color: 'white',
                    fontWeight: 900,
                    mb: 2,
                    fontSize: { xs: '2.5rem', md: '3.5rem' }
                  }}
                >
                  Your Future Starts at{' '}
                  <span style={{ color: '#fbbf24' }}>PESin</span>
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    mb: 4,
                    fontWeight: 400,
                    lineHeight: 1.6
                  }}
                >
                  The ultimate platform for PES students to build portfolios,
                  connect with companies, and launch their careers.
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate('/register')}
                    endIcon={<KeyboardArrowRight />}
                    sx={{
                      background: 'white',
                      color: '#667eea',
                      fontWeight: 700,
                      px: 4,
                      py: 2,
                      fontSize: '1.1rem',
                      '&:hover': {
                        background: '#f9fafb',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
                      }
                    }}
                  >
                    Join Now
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    sx={{
                      borderColor: 'white',
                      color: 'white',
                      fontWeight: 700,
                      px: 4,
                      py: 2,
                      fontSize: '1.1rem',
                      '&:hover': {
                        borderColor: 'white',
                        background: 'rgba(255, 255, 255, 0.1)',
                      }
                    }}
                  >
                    Learn More
                  </Button>
                </Stack>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Box
                  component="img"
                  src="https://illustrations.popsy.co/amber/remote-work.svg"
                  alt="Student Success"
                  sx={{
                    width: '100%',
                    height: 'auto',
                    filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.3))',
                    animation: 'float 4s ease-in-out infinite'
                  }}
                />
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section with Animated Counters */}
      <Box sx={{ py: 12, background: 'white', position: 'relative' }}>
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            {stats.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    type: 'spring',
                    stiffness: 200
                  }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1 }}
                >
                  <Box 
                    sx={{ 
                      textAlign: 'center',
                      p: 4,
                      borderRadius: 4,
                      background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.05), rgba(30, 136, 229, 0.05))',
                      border: '2px solid transparent',
                      backgroundImage: 'linear-gradient(white, white), linear-gradient(135deg, #ff6b35, #1e88e5)',
                      backgroundOrigin: 'border-box',
                      backgroundClip: 'padding-box, border-box',
                      transition: 'all 0.3s',
                      '&:hover': {
                        transform: 'translateY(-10px)',
                        boxShadow: '0 20px 40px rgba(255, 107, 53, 0.2)'
                      }
                    }}
                  >
                    <Typography
                      variant="h2"
                      className="gradient-text"
                      sx={{
                        fontWeight: 900,
                        mb: 1,
                        fontSize: { xs: '2.5rem', md: '3.5rem' }
                      }}
                    >
                      {stat.number}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{ color: '#64748b', fontWeight: 600 }}
                    >
                      {stat.label}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Features Section with Glassmorphism */}
      <Box className="mesh-gradient" sx={{ py: 16, position: 'relative' }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Box sx={{ textAlign: 'center', mb: 10 }}>
              <Typography
                variant="h2"
                className="gradient-text"
                sx={{
                  fontWeight: 900,
                  mb: 3,
                  fontSize: { xs: '2.5rem', md: '3.5rem' }
                }}
              >
                Everything You Need to Succeed
              </Typography>
              <Typography 
                variant="h5" 
                sx={{ 
                  color: '#64748b', 
                  fontWeight: 500,
                  maxWidth: '600px',
                  mx: 'auto'
                }}
              >
                Powerful features designed to accelerate your career journey
              </Typography>
            </Box>
          </motion.div>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -15, scale: 1.02 }}
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
                        height: '4px',
                        background: `linear-gradient(90deg, ${feature.color}, ${feature.color}aa)`,
                      },
                      '&:hover': {
                        boxShadow: `0 20px 60px 0 ${feature.color}40`,
                        border: `1px solid ${feature.color}60`,
                      }
                    }}
                  >
                    <CardContent sx={{ p: 5 }}>
                      <Box
                        sx={{
                          width: 80,
                          height: 80,
                          borderRadius: 4,
                          background: `linear-gradient(135deg, ${feature.color}15, ${feature.color}30)`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mb: 3,
                          color: feature.color,
                          boxShadow: `0 8px 24px ${feature.color}30`,
                          transition: 'all 0.3s',
                          '&:hover': {
                            transform: 'rotate(10deg) scale(1.1)',
                            boxShadow: `0 12px 32px ${feature.color}50`
                          }
                        }}
                      >
                        {feature.icon}
                      </Box>
                      <Typography
                        variant="h5"
                        sx={{ 
                          fontWeight: 800, 
                          mb: 2,
                          background: `linear-gradient(135deg, ${feature.color}, ${feature.color}aa)`,
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent'
                        }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography sx={{ color: '#64748b', lineHeight: 1.8, fontSize: '1rem' }}>
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section with Neon Effect */}
      <Box
        className="animated-gradient"
        sx={{
          py: 16,
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Decorative Elements */}
        <Box className="orb orb-orange" sx={{ width: '300px', height: '300px', top: '-100px', right: '10%', position: 'absolute', opacity: 0.3 }} />
        <Box className="orb orb-blue" sx={{ width: '250px', height: '250px', bottom: '-80px', left: '15%', position: 'absolute', opacity: 0.3 }} />

        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Typography
              variant="h2"
              sx={{
                color: 'white',
                fontWeight: 900,
                mb: 3,
                fontSize: { xs: '2rem', md: '3.5rem' },
                textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
              }}
            >
              Ready to Transform Your Career?
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: 'rgba(255, 255, 255, 0.95)',
                mb: 5,
                lineHeight: 1.8,
                fontSize: { xs: '1.1rem', md: '1.3rem' }
              }}
            >
              Join thousands of PES students building their future with PESin
            </Typography>
            <Stack direction="row" spacing={3} justifyContent="center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/register')}
                  className="neon-orange"
                  sx={{
                    background: 'white',
                    color: '#ff6b35',
                    fontWeight: 800,
                    px: 6,
                    py: 2.5,
                    fontSize: '1.2rem',
                    borderRadius: '50px',
                    textTransform: 'none',
                    boxShadow: '0 8px 30px rgba(255, 255, 255, 0.4)',
                    '&:hover': {
                      background: '#fff',
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 40px rgba(255, 255, 255, 0.6)'
                    }
                  }}
                >
                  Get Started for Free →
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: 'white',
                    borderWidth: '2px',
                    color: 'white',
                    fontWeight: 700,
                    px: 6,
                    py: 2.5,
                    fontSize: '1.2rem',
                    borderRadius: '50px',
                    textTransform: 'none',
                    backdropFilter: 'blur(10px)',
                    background: 'rgba(255, 255, 255, 0.1)',
                    '&:hover': {
                      borderColor: 'white',
                      borderWidth: '2px',
                      background: 'rgba(255, 255, 255, 0.2)',
                      transform: 'translateY(-4px)'
                    }
                  }}
                >
                  Learn More
                </Button>
              </motion.div>
            </Stack>
          </motion.div>
        </Container>
      </Box>

      {/* Footer with Gradient */}
      <Box sx={{ py: 8, background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)', color: 'white' }}>
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <img 
                  src="/pesin-logo.jpeg" 
                  alt="PESin Logo" 
                  style={{ 
                    height: '50px', 
                    width: '50px', 
                    borderRadius: '12px',
                    marginRight: '16px',
                    objectFit: 'cover'
                  }} 
                />
                <Typography 
                  variant="h4" 
                  className="gradient-text"
                  sx={{ fontWeight: 900 }}
                >
                  PESin
                </Typography>
              </Box>
              <Typography sx={{ color: '#94a3b8', lineHeight: 1.8, mb: 3 }}>
                Empowering PES students to achieve their career goals through technology and innovation.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                Team Members
              </Typography>
              <Typography sx={{ color: '#9ca3af' }}>
                Diya R Gowda - PES1UG24CS159
              </Typography>
              <Typography sx={{ color: '#9ca3af' }}>
                Deeptha S - PES1UG24CS144
              </Typography>
              <Typography sx={{ color: '#9ca3af' }}>
                Epari Subhransi - PES1UG24CS161
              </Typography>
            </Grid>
          </Grid>
          <Box sx={{ textAlign: 'center', mt: 4, pt: 4, borderTop: '1px solid #374151' }}>
            <Typography sx={{ color: '#9ca3af' }}>
              © 2025 PESin. All rights reserved. Made with ❤️ for PES University
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
