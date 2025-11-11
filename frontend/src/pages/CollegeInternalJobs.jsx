import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  IconButton,
  Divider
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Work,
  School,
  CalendarToday,
  People
} from '@mui/icons-material';
import axios from 'axios';
import { toast } from 'react-toastify';

const CollegeInternalJobs = ({ isAdmin = false }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    type: 'TA',
    description: '',
    requirements: '',
    positions: 1,
    stipend: '',
    duration: '',
    deadline: ''
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem('token');
      const endpoint = isAdmin 
        ? 'http://localhost:5000/api/admin/internal-jobs'
        : 'http://localhost:5000/api/jobs/internal';
      
      const response = await axios.get(endpoint, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setJobs(response.data.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      toast.error('Failed to load internal positions');
      setLoading(false);
    }
  };

  const handleOpenDialog = (job = null) => {
    if (job) {
      setEditingJob(job);
      setFormData({
        title: job.title,
        department: job.department,
        type: job.type,
        description: job.description,
        requirements: job.requirements,
        positions: job.positions,
        stipend: job.stipend || '',
        duration: job.duration,
        deadline: job.deadline ? job.deadline.split('T')[0] : ''
      });
    } else {
      setEditingJob(null);
      setFormData({
        title: '',
        department: '',
        type: 'TA',
        description: '',
        requirements: '',
        positions: 1,
        stipend: '',
        duration: '',
        deadline: ''
      });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingJob(null);
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      if (editingJob) {
        await axios.put(
          `http://localhost:5000/api/admin/internal-jobs/${editingJob._id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success('Position updated successfully!');
      } else {
        await axios.post(
          'http://localhost:5000/api/admin/internal-jobs',
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success('Position posted successfully!');
      }
      fetchJobs();
      handleCloseDialog();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save position');
    }
  };

  const handleDelete = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this position?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/api/admin/internal-jobs/${jobId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Position deleted successfully!');
        fetchJobs();
      } catch (error) {
        toast.error('Failed to delete position');
      }
    }
  };

  const getTypeColor = (category) => {
    const colors = {
      'Teaching Assistant': '#1e88e5',
      'Research Assistant': '#ff6b35',
      'Event Volunteer': '#10b981',
      'Lab Assistant': '#7e57c2',
      'Department Assistant': '#f59e0b',
      'Peer Tutor': '#06b6d4',
      'Student Mentor': '#8b5cf6',
      'Campus Ambassador': '#ec4899'
    };
    return colors[category] || '#64748b';
  };

  const getTypeIcon = (category) => {
    switch (category) {
      case 'Teaching Assistant': return <School />;
      case 'Research Assistant': return <School />;
      case 'Lab Assistant': return <Work />;
      case 'Event Volunteer': return <People />;
      case 'Peer Tutor': return <School />;
      case 'Student Mentor': return <People />;
      default: return <Work />;
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', py: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1
              }}
            >
              {isAdmin ? 'Manage Internal Positions' : 'College Opportunities'} 🎯
            </Typography>
            <Typography variant="body1" sx={{ color: '#64748b' }}>
              {isAdmin 
                ? 'Post and manage TA positions, internships, and volunteer opportunities'
                : 'Browse available positions within PES University'
              }
            </Typography>
          </Box>
          {isAdmin && (
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => handleOpenDialog()}
              sx={{
                bgcolor: '#667eea',
                borderRadius: 3,
                px: 3,
                py: 1.5,
                fontWeight: 700,
                '&:hover': { bgcolor: '#5568d3' }
              }}
            >
              Post New Position
            </Button>
          )}
        </Box>

        {/* Statistics */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              <CardContent>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#1e88e5' }}>
                  {jobs.filter(j => j.category === 'Teaching Assistant').length}
                </Typography>
                <Typography variant="body2" color="text.secondary">TA Positions</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              <CardContent>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#ff6b35' }}>
                  {jobs.filter(j => j.category === 'Research Assistant').length}
                </Typography>
                <Typography variant="body2" color="text.secondary">Research Positions</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              <CardContent>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#10b981' }}>
                  {jobs.filter(j => j.category === 'Event Volunteer').length}
                </Typography>
                <Typography variant="body2" color="text.secondary">Volunteer Roles</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              <CardContent>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#7e57c2' }}>
                  {jobs.filter(j => j.category === 'Lab Assistant').length}
                </Typography>
                <Typography variant="body2" color="text.secondary">Lab Positions</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Job Cards */}
        {loading ? (
          <Typography textAlign="center">Loading positions...</Typography>
        ) : jobs.length === 0 ? (
          <Card sx={{ borderRadius: 4, p: 6, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary">
              No positions available at the moment
            </Typography>
          </Card>
        ) : (
          <Grid container spacing={3}>
            {jobs.map((job) => (
              <Grid item xs={12} md={6} key={job._id}>
                <Card
                  sx={{
                    borderRadius: 4,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 24px rgba(0,0,0,0.15)'
                    }
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    {/* Header */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box
                          sx={{
                            bgcolor: getTypeColor(job.category),
                            color: 'white',
                            p: 1,
                            borderRadius: 2,
                            display: 'flex'
                          }}
                        >
                          {getTypeIcon(job.category)}
                        </Box>
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            {job.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {job.department}
                          </Typography>
                        </Box>
                      </Box>
                      {isAdmin && (
                        <Box>
                          <IconButton size="small" onClick={() => handleOpenDialog(job)} sx={{ color: '#1e88e5' }}>
                            <Edit fontSize="small" />
                          </IconButton>
                          <IconButton size="small" onClick={() => handleDelete(job._id)} sx={{ color: '#ef5350' }}>
                            <Delete fontSize="small" />
                          </IconButton>
                        </Box>
                      )}
                    </Box>

                    <Chip
                      label={job.category}
                      size="small"
                      sx={{
                        bgcolor: getTypeColor(job.category),
                        color: 'white',
                        fontWeight: 600,
                        mb: 2
                      }}
                    />

                    {/* Description */}
                    <Typography variant="body2" sx={{ mb: 2, color: '#64748b' }}>
                      {job.description}
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    {/* Details */}
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <People sx={{ fontSize: '1rem', color: '#64748b' }} />
                          <Typography variant="caption" color="text.secondary">
                            {job.openings} {job.openings === 1 ? 'Position' : 'Positions'}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <CalendarToday sx={{ fontSize: '1rem', color: '#64748b' }} />
                          <Typography variant="caption" color="text.secondary">
                            {job.duration}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>

                    {/* Requirements */}
                    {job.eligibilityCriteria && job.eligibilityCriteria.requiredSkills && job.eligibilityCriteria.requiredSkills.length > 0 && (
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="caption" sx={{ fontWeight: 600, color: '#64748b', display: 'block', mb: 1 }}>
                          Required Skills:
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                          {job.eligibilityCriteria.requiredSkills.map((skill, idx) => (
                            <Chip key={idx} label={skill} size="small" variant="outlined" />
                          ))}
                        </Box>
                      </Box>
                    )}

                    {/* Deadline */}
                    {job.applicationDeadline && (
                      <Box sx={{ mt: 2, p: 2, bgcolor: '#fef3c7', borderRadius: 2 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#92400e' }}>
                          Apply by: {new Date(job.applicationDeadline).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </Typography>
                      </Box>
                    )}

                    {/* Apply Button (for students) */}
                    {!isAdmin && (
                      <Button
                        fullWidth
                        variant="contained"
                        sx={{
                          mt: 2,
                          bgcolor: getTypeColor(job.type),
                          borderRadius: 2,
                          py: 1.5,
                          fontWeight: 700,
                          '&:hover': { opacity: 0.9 }
                        }}
                      >
                        Apply Now
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Add/Edit Dialog (Admin Only) */}
        {isAdmin && (
          <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth>
            <DialogTitle sx={{ fontWeight: 700, fontSize: '1.5rem' }}>
              {editingJob ? 'Edit Position' : 'Post New Position'}
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12} sm={8}>
                  <TextField
                    fullWidth
                    label="Position Title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    select
                    label="Type"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    required
                  >
                    <MenuItem value="TA">Teaching Assistant</MenuItem>
                    <MenuItem value="Intern">Internship</MenuItem>
                    <MenuItem value="Volunteer">Volunteer</MenuItem>
                    <MenuItem value="Research">Research</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Department"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    placeholder="e.g., Computer Science, JOEL Lab"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    label="Requirements"
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Positions Available"
                    value={formData.positions}
                    onChange={(e) => setFormData({ ...formData, positions: parseInt(e.target.value) })}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Stipend (₹)"
                    value={formData.stipend}
                    onChange={(e) => setFormData({ ...formData, stipend: e.target.value })}
                    placeholder="Optional"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Duration"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="e.g., 6 months"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="date"
                    label="Application Deadline"
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions sx={{ p: 3 }}>
              <Button onClick={handleCloseDialog} sx={{ color: '#64748b' }}>
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                variant="contained"
                sx={{
                  bgcolor: '#667eea',
                  px: 4,
                  fontWeight: 700,
                  '&:hover': { bgcolor: '#5568d3' }
                }}
              >
                {editingJob ? 'Update' : 'Post'} Position
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </Container>
    </Box>
  );
};

export default CollegeInternalJobs;
