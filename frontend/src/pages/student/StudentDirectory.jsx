import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  TextField,
  InputAdornment,
  Button,
  IconButton,
  Divider,
  Tab,
  Tabs
} from '@mui/material';
import {
  Search,
  LinkedIn,
  GitHub,
  Language,
  Business,
  School,
  Star,
  LocationOn,
  Phone,
  Email
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const StudentDirectory = () => {
  const { user } = useAuth();
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTab, setFilterTab] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    filterStudents();
  }, [searchTerm, filterTab, students]);

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/students', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStudents(response.data.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching students:', error);
      toast.error('Failed to load students');
      setLoading(false);
    }
  };

  const filterStudents = () => {
    let filtered = students;

    // Filter by status
    if (filterTab === 'current') {
      filtered = filtered.filter(s => s.currentStatus === 'current');
    } else if (filterTab === 'alumni') {
      filtered = filtered.filter(s => s.currentStatus === 'alumni');
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(student =>
        `${student.firstName} ${student.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.skills?.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
        student.branch?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.bio?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredStudents(filtered);
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();
  };

  const getAvatarColor = (name) => {
    const colors = ['#ff6b35', '#f7931e', '#1e88e5', '#42a5f5', '#7e57c2', '#26a69a', '#66bb6a', '#ef5350'];
    const index = (name?.charCodeAt(0) || 0) % colors.length;
    return colors[index];
  };

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', py: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              mb: 2,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Student Directory 🎓
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748b', mb: 3 }}>
            Connect with fellow students and alumni from PES University
          </Typography>

          {/* Search Bar */}
          <TextField
            fullWidth
            placeholder="Search by name, skills, branch..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{
              maxWidth: 600,
              mx: 'auto',
              '& .MuiOutlinedInput-root': {
                borderRadius: 8,
                bgcolor: 'white',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }
            }}
          />
        </Box>

        {/* Tabs */}
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
          <Tabs
            value={filterTab}
            onChange={(e, newValue) => setFilterTab(newValue)}
            sx={{
              bgcolor: 'white',
              borderRadius: 4,
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              '& .MuiTab-root': {
                fontWeight: 600,
                fontSize: '1rem',
                px: 4
              }
            }}
          >
            <Tab label={`All (${students.length})`} value="all" />
            <Tab label={`Current Students (${students.filter(s => s.currentStatus === 'current').length})`} value="current" />
            <Tab label={`Alumni (${students.filter(s => s.currentStatus === 'alumni').length})`} value="alumni" />
          </Tabs>
        </Box>

        {/* Results Count */}
        <Typography variant="body2" sx={{ mb: 3, color: '#64748b', textAlign: 'center' }}>
          Showing {filteredStudents.length} {filteredStudents.length === 1 ? 'student' : 'students'}
        </Typography>

        {/* Student Cards */}
        {loading ? (
          <Typography textAlign="center">Loading...</Typography>
        ) : (
          <Grid container spacing={3}>
            {filteredStudents.map((student) => (
              <Grid item xs={12} sm={6} md={4} key={student._id}>
                <Card
                  sx={{
                    height: '100%',
                    borderRadius: 4,
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 24px rgba(0,0,0,0.15)'
                    }
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    {/* Avatar and Status Badge */}
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                      <Avatar
                        sx={{
                          width: 80,
                          height: 80,
                          bgcolor: getAvatarColor(student.firstName),
                          fontSize: '2rem',
                          fontWeight: 700,
                          mr: 2
                        }}
                      >
                        {getInitials(student.firstName, student.lastName)}
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Chip
                          label={student.currentStatus === 'alumni' ? '🎓 Alumni' : '👨‍🎓 Student'}
                          size="small"
                          sx={{
                            bgcolor: student.currentStatus === 'alumni' ? '#fef3c7' : '#dbeafe',
                            color: student.currentStatus === 'alumni' ? '#92400e' : '#1e40af',
                            fontWeight: 600,
                            mb: 1
                          }}
                        />
                      </Box>
                    </Box>

                    {/* Name and USN */}
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                      {student.firstName} {student.lastName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {student.usn}
                    </Typography>

                    {/* Branch and Semester */}
                    <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                      {student.branch && (
                        <Chip
                          icon={<School />}
                          label={student.branch}
                          size="small"
                          sx={{ bgcolor: '#f3f4f6' }}
                        />
                      )}
                      {student.semester && (
                        <Chip
                          label={`Sem ${student.semester}`}
                          size="small"
                          sx={{ bgcolor: '#f3f4f6' }}
                        />
                      )}
                      {student.graduationYear && (
                        <Chip
                          label={`Class of ${student.graduationYear}`}
                          size="small"
                          sx={{ bgcolor: '#f3f4f6' }}
                        />
                      )}
                    </Box>

                    {/* Bio */}
                    {student.bio && (
                      <Typography
                        variant="body2"
                        sx={{
                          mb: 2,
                          color: '#64748b',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          minHeight: '40px'
                        }}
                      >
                        {student.bio}
                      </Typography>
                    )}

                    <Divider sx={{ my: 2 }} />

                    {/* Skills */}
                    <Typography variant="caption" sx={{ fontWeight: 600, color: '#64748b', mb: 1, display: 'block' }}>
                      Top Skills:
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 2 }}>
                      {student.skills?.slice(0, 4).map((skill, idx) => (
                        <Chip
                          key={idx}
                          label={skill}
                          size="small"
                          sx={{
                            bgcolor: idx === 0 ? '#ff6b35' : '#e5e7eb',
                            color: idx === 0 ? 'white' : '#374151',
                            fontWeight: idx === 0 ? 700 : 500,
                            fontSize: '0.7rem'
                          }}
                          icon={idx === 0 ? <Star sx={{ fontSize: '0.9rem', color: 'white !important' }} /> : undefined}
                        />
                      ))}
                      {student.skills?.length > 4 && (
                        <Chip
                          label={`+${student.skills.length - 4}`}
                          size="small"
                          sx={{ bgcolor: '#e5e7eb', fontSize: '0.7rem' }}
                        />
                      )}
                    </Box>

                    {/* Target Company - For Alumni show Current Company */}
                    {student.currentStatus === 'alumni' && student.currentCompany && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <Business sx={{ fontSize: '1rem', color: '#10b981' }} />
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#10b981' }}>
                          {student.currentCompany}
                        </Typography>
                      </Box>
                    )}

                    {/* Contact Info */}
                    <Box sx={{ mt: 2 }}>
                      {student.email && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <Email sx={{ fontSize: '0.9rem', color: '#64748b' }} />
                          <Typography variant="caption" sx={{ color: '#64748b' }}>
                            {student.email}
                          </Typography>
                        </Box>
                      )}
                      {student.phone && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Phone sx={{ fontSize: '0.9rem', color: '#64748b' }} />
                          <Typography variant="caption" sx={{ color: '#64748b' }}>
                            {student.phone}
                          </Typography>
                        </Box>
                      )}
                    </Box>

                    {/* Social Links */}
                    <Box sx={{ display: 'flex', gap: 1, mt: 2, justifyContent: 'center' }}>
                      {student.linkedIn && (
                        <IconButton
                          size="small"
                          href={student.linkedIn}
                          target="_blank"
                          sx={{ bgcolor: '#0077b5', color: 'white', '&:hover': { bgcolor: '#005582' } }}
                        >
                          <LinkedIn sx={{ fontSize: '1.2rem' }} />
                        </IconButton>
                      )}
                      {student.github && (
                        <IconButton
                          size="small"
                          href={student.github}
                          target="_blank"
                          sx={{ bgcolor: '#333', color: 'white', '&:hover': { bgcolor: '#000' } }}
                        >
                          <GitHub sx={{ fontSize: '1.2rem' }} />
                        </IconButton>
                      )}
                      {student.portfolio && (
                        <IconButton
                          size="small"
                          href={student.portfolio}
                          target="_blank"
                          sx={{ bgcolor: '#667eea', color: 'white', '&:hover': { bgcolor: '#5568d3' } }}
                        >
                          <Language sx={{ fontSize: '1.2rem' }} />
                        </IconButton>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {filteredStudents.length === 0 && !loading && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No students found matching your criteria
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default StudentDirectory;
