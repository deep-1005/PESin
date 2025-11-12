import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  LinearProgress,
  AppBar,
  Toolbar,
  IconButton,
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArrowBack, Business, TrendingUp, CheckCircle } from '@mui/icons-material';
import axios from 'axios';
import { toast } from 'react-toastify';

const CompanyRecommendations = () => {
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/students/recommendations', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.data.success) {
        setRecommendations(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Failed to fetch recommendations');
      }
    } finally {
      setLoading(false);
    }
  };

  const getMatchColor = (percentage) => {
    if (percentage >= 70) return '#10b981';
    if (percentage >= 50) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
      <AppBar 
        position="static" 
        sx={{ 
          background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 50%, #1e88e5 100%)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}
      >
        <Toolbar>
          <IconButton color="inherit" onClick={() => navigate('/student/dashboard')}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 700, ml: 2 }}>
            Company Recommendations
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
            🎯 Your Perfect Company Match
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Based on your selected Top Skill
          </Typography>
        </Box>

        {loading ? (
          <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 3 }}>
            <Typography sx={{ mb: 2 }}>Loading your personalized recommendation...</Typography>
            <LinearProgress />
          </Paper>
        ) : recommendations.length === 0 ? (
          <Alert 
            severity="warning" 
            sx={{ 
              borderRadius: 3, 
              p: 3,
              '& .MuiAlert-message': { width: '100%' }
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              🎓 Select Your Top Skill First!
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              To get your personalized company recommendation, please select your top skill from the dropdown in your profile.
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
              <strong>Available top skills:</strong>
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Chip label="JavaScript → Google" sx={{ mr: 1, mb: 1 }} color="primary" />
              <Chip label="HTML and CSS → Airbnb" sx={{ mr: 1, mb: 1 }} color="secondary" />
              <Chip label="Backend → Amazon" sx={{ mr: 1, mb: 1 }} color="success" />
              <Chip label="Data Science → Netflix" sx={{ mr: 1, mb: 1 }} color="error" />
              <Chip label="Node → PayPal" sx={{ mr: 1, mb: 1 }} color="info" />
            </Box>
            <Button 
              variant="contained" 
              size="large"
              sx={{ 
                mt: 2,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              }}
              onClick={() => navigate('/student/profile')}
            >
              Go to Profile & Select Top Skill
            </Button>
          </Alert>
        ) : (
          <Grid container spacing={3}>
            {recommendations.map((rec, index) => (
              <Grid item xs={12} key={index}>
                <Card 
                  sx={{ 
                    height: '100%',
                    transition: 'all 0.3s ease',
                    borderRadius: 4,
                    border: '2px solid #10b981',
                    background: 'linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 20px 60px rgba(16, 185, 129, 0.3)'
                    }
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    {/* Perfect Match Badge */}
                    <Box sx={{ textAlign: 'center', mb: 3 }}>
                      <Chip 
                        icon={<CheckCircle />}
                        label="🎯 PERFECT MATCH FOR YOUR TOP SKILL"
                        sx={{ 
                          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                          color: 'white',
                          fontWeight: 800,
                          fontSize: '1rem',
                          py: 3,
                          px: 2,
                          height: 'auto',
                          '& .MuiChip-icon': { color: 'white', fontSize: '1.5rem' }
                        }}
                      />
                    </Box>

                    {/* Company Header */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Business sx={{ fontSize: 60, color: '#10b981', mr: 2 }} />
                        <Box>
                          <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
                            {rec.company.name}
                          </Typography>
                          <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 500 }}>
                            {rec.company.industry}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                            📍 {rec.company.location}
                          </Typography>
                        </Box>
                      </Box>
                      <Chip 
                        label={`${rec.matchPercentage}% Match`}
                        sx={{ 
                          background: '#10b981',
                          color: 'white',
                          fontWeight: 800,
                          fontSize: '1.2rem',
                          py: 3,
                          px: 2,
                          height: 'auto'
                        }}
                      />
                    </Box>

                    {/* Description */}
                    <Paper sx={{ p: 3, mb: 3, background: 'white', borderRadius: 3 }}>
                      <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                        {rec.company.description}
                      </Typography>
                    </Paper>

                    {/* Your Top Skill */}
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, display: 'flex', alignItems: 'center' }}>
                        <TrendingUp sx={{ fontSize: 24, mr: 1, color: '#10b981' }} />
                        Your Top Skill
                      </Typography>
                      <Chip 
                        icon={<CheckCircle />}
                        label={rec.matchedSkills[0]} 
                        sx={{ 
                          fontSize: '1.1rem',
                          py: 3,
                          px: 2,
                          height: 'auto',
                          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                          color: 'white',
                          fontWeight: 700,
                          '& .MuiChip-icon': { color: 'white', fontSize: '1.3rem' }
                        }}
                      />
                    </Box>

                    {/* Why This Match */}
                    <Paper sx={{ mb: 3, p: 3, background: '#ecfdf5', borderRadius: 3, border: '2px solid #10b981' }}>
                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#10b981' }}>
                        ✨ Why This is Your Perfect Match
                      </Typography>
                      <Typography variant="body1" sx={{ color: '#065f46' }}>
                        {rec.reason || `${rec.company.name} is the ideal company for students with ${rec.matchedSkills[0]} as their top skill!`}
                      </Typography>
                    </Paper>

                    {/* Contact Information */}
                    <Grid container spacing={2} sx={{ mb: 3 }}>
                      <Grid item xs={12} md={6}>
                        <Paper sx={{ p: 2, borderRadius: 2, textAlign: 'center' }}>
                          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                            Website
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: '#667eea' }}>
                            <a href={rec.company.website} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                              Visit Career Page →
                            </a>
                          </Typography>
                        </Paper>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Paper sx={{ p: 2, borderRadius: 2, textAlign: 'center' }}>
                          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                            Contact
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {rec.company.contactEmail}
                          </Typography>
                        </Paper>
                      </Grid>
                    </Grid>

                    {/* Action Buttons */}
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Button 
                          variant="contained" 
                          fullWidth
                          size="large"
                          sx={{
                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                            fontWeight: 700,
                            fontSize: '1.1rem',
                            py: 1.5,
                            '&:hover': {
                              background: 'linear-gradient(135deg, #059669 0%, #047857 100%)'
                            }
                          }}
                          onClick={() => window.open(rec.company.website, '_blank')}
                        >
                          View Opportunities
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Button 
                          variant="outlined" 
                          fullWidth
                          size="large"
                          sx={{
                            borderWidth: 2,
                            borderColor: '#10b981',
                            color: '#10b981',
                            fontWeight: 700,
                            fontSize: '1.1rem',
                            py: 1.5,
                            '&:hover': {
                              borderWidth: 2,
                              borderColor: '#059669',
                              background: '#ecfdf5'
                            }
                          }}
                        >
                          Save for Later
                        </Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default CompanyRecommendations;
