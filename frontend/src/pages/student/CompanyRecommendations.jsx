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
      const response = await axios.get('/api/students/recommendations');
      if (response.data.success) {
        setRecommendations(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      toast.error('Failed to fetch recommendations');
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
            Companies Matched For You
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Based on your skills and profile
          </Typography>
        </Box>

        {loading ? (
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography sx={{ mb: 2 }}>Loading recommendations...</Typography>
            <LinearProgress />
          </Paper>
        ) : recommendations.length === 0 ? (
          <Alert severity="info">
            <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
              No recommendations available yet
            </Typography>
            <Typography variant="body2">
              Please complete your profile and add skills to get personalized company recommendations.
            </Typography>
            <Button 
              variant="contained" 
              sx={{ mt: 2 }}
              onClick={() => navigate('/student/profile')}
            >
              Complete Profile
            </Button>
          </Alert>
        ) : (
          <Grid container spacing={3}>
            {recommendations.map((rec, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card 
                  sx={{ 
                    height: '100%',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 15px 40px rgba(0,0,0,0.15)'
                    }
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    {/* Company Header */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Business sx={{ fontSize: 40, color: '#ff6b35', mr: 2 }} />
                      <Box>
                          <Typography variant="h5" sx={{ fontWeight: 700 }}>
                            {rec.company.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {rec.company.industry}
                          </Typography>
                        </Box>
                      </Box>
                      <Chip 
                        label={`${rec.matchPercentage}% Match`}
                        sx={{ 
                          background: getMatchColor(rec.matchPercentage),
                          color: 'white',
                          fontWeight: 700
                        }}
                      />
                    </Box>

                    {/* Match Details */}
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, display: 'flex', alignItems: 'center' }}>
                        <TrendingUp sx={{ fontSize: 18, mr: 0.5, color: '#10b981' }} />
                        Match Score
                      </Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={rec.matchPercentage} 
                        sx={{ 
                          height: 8, 
                          borderRadius: 4,
                          backgroundColor: '#e5e7eb',
                          '& .MuiLinearProgress-bar': {
                            background: `linear-gradient(90deg, ${getMatchColor(rec.matchPercentage)}, ${getMatchColor(rec.matchPercentage)}dd)`
                          }
                        }}
                      />
                    </Box>

                    {/* Matched Skills */}
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, display: 'flex', alignItems: 'center' }}>
                        <CheckCircle sx={{ fontSize: 18, mr: 0.5, color: '#10b981' }} />
                        Matched Skills ({rec.matchedSkills.length})
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {rec.matchedSkills.map((skill, i) => (
                          <Chip 
                            key={i} 
                            label={skill} 
                            size="small" 
                            color="success" 
                            variant="outlined"
                          />
                        ))}
                      </Box>
                    </Box>

                    {/* Missing Skills */}
                    {rec.missingSkills.length > 0 && (
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: '#f59e0b' }}>
                          Skills to Improve ({rec.missingSkills.length})
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {rec.missingSkills.slice(0, 5).map((skill, i) => (
                            <Chip 
                              key={i} 
                              label={skill} 
                              size="small" 
                              sx={{ 
                                backgroundColor: '#fef3c7',
                                color: '#92400e'
                              }}
                            />
                          ))}
                        </Box>
                      </Box>
                    )}

                    {/* Job Requirements */}
                    <Box sx={{ mb: 2, p: 2, background: '#f9fafb', borderRadius: 2 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                        Requirements
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                        Min CGPA: {rec.company.jobRequirements?.minCGPA || 'N/A'}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                        Eligible Branches: {rec.company.jobRequirements?.eligibleBranches?.join(', ') || 'All'}
                      </Typography>
                    </Box>

                    {/* Action Button */}
                    <Button 
                      variant="contained" 
                      fullWidth
                      sx={{
                        background: 'linear-gradient(135deg, #ff6b35 0%, #1e88e5 100%)',
                        fontWeight: 600,
                        '&:hover': {
                          background: 'linear-gradient(135deg, #ff5722 0%, #1976d2 100%)'
                        }
                      }}
                    >
                      View Details & Apply
                    </Button>
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
