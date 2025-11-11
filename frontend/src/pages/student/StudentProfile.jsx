import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper,
  Grid,
  TextField,
  Button,
  Chip,
  IconButton,
  Avatar,
  Divider,
  AppBar,
  Toolbar,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  ArrowBack, 
  Edit, 
  Save, 
  Add, 
  Delete,
  CloudUpload,
  School,
  Code,
  EmojiEvents,
  Description
} from '@mui/icons-material';
import axios from 'axios';
import { toast } from 'react-toastify';

const StudentProfile = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    bio: '',
    cgpa: '',
    skills: [],
    projects: [],
    certifications: [],
    resume: null
  });
  const [newSkill, setNewSkill] = useState('');
  const [projectDialog, setProjectDialog] = useState(false);
  const [certDialog, setCertDialog] = useState(false);
  const [currentProject, setCurrentProject] = useState({
    title: '',
    description: '',
    technologies: '',
    link: ''
  });
  const [currentCert, setCurrentCert] = useState({
    title: '',
    issuer: '',
    date: '',
    credentialId: ''
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/students/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.data.success) {
        const data = response.data.data;
        setProfileData({
          bio: data.bio || '',
          cgpa: data.cgpa || '',
          skills: data.skills || [],
          projects: data.projects || [],
          certifications: data.certifications || [],
          resume: data.resumeUrl || null
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Failed to load profile');
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('http://localhost:5000/api/students/profile', profileData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.data.success) {
        toast.success('Profile updated successfully!');
        setEditing(false);
        updateUser(response.data.data);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !profileData.skills.includes(newSkill.trim())) {
      setProfileData({
        ...profileData,
        skills: [...profileData.skills, newSkill.trim()]
      });
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setProfileData({
      ...profileData,
      skills: profileData.skills.filter(skill => skill !== skillToRemove)
    });
  };

  const handleAddProject = () => {
    if (currentProject.title && currentProject.description) {
      setProfileData({
        ...profileData,
        projects: [...profileData.projects, {
          ...currentProject,
          technologies: currentProject.technologies.split(',').map(t => t.trim())
        }]
      });
      setCurrentProject({ title: '', description: '', technologies: '', link: '' });
      setProjectDialog(false);
    }
  };

  const handleAddCertification = () => {
    if (currentCert.title && currentCert.issuer) {
      setProfileData({
        ...profileData,
        certifications: [...profileData.certifications, currentCert]
      });
      setCurrentCert({ title: '', issuer: '', date: '', credentialId: '' });
      setCertDialog(false);
    }
  };

  const handleResumeUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('resume', file);

      try {
        const token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:5000/api/students/resume', formData, {
          headers: { 
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.data.success) {
          toast.success('Resume uploaded successfully!');
          setProfileData({ ...profileData, resume: response.data.data.resumeUrl });
          fetchProfile(); // Refresh profile data
        }
      } catch (error) {
        console.error('Resume upload error:', error);
        toast.error(error.response?.data?.message || 'Failed to upload resume');
      }
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
      {/* App Bar */}
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
            My Profile & Portfolio
          </Typography>
          {!editing ? (
            <Button 
              variant="contained" 
              startIcon={<Edit />}
              onClick={() => setEditing(true)}
              sx={{ 
                background: 'white', 
                color: '#667eea',
                '&:hover': { background: '#f3f4f6' }
              }}
            >
              Edit Profile
            </Button>
          ) : (
            <>
              <Button 
                variant="contained" 
                startIcon={<Save />}
                onClick={handleSave}
                disabled={loading}
                sx={{ 
                  background: 'white', 
                  color: '#10b981',
                  mr: 1,
                  '&:hover': { background: '#f3f4f6' }
                }}
              >
                Save
              </Button>
              <Button 
                variant="outlined" 
                onClick={() => {
                  setEditing(false);
                  fetchProfile();
                }}
                sx={{ 
                  color: 'white',
                  borderColor: 'white',
                  '&:hover': { borderColor: 'white', background: 'rgba(255,255,255,0.1)' }
                }}
              >
                Cancel
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          {/* Left Column - Basic Info */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, borderRadius: 3, textAlign: 'center' }}>
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  mx: 'auto',
                  mb: 2,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  fontSize: '3rem'
                }}
              >
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </Avatar>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                {user?.firstName} {user?.lastName}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {user?.email}
              </Typography>
              <Chip label={user?.branch} color="primary" sx={{ mb: 1, mr: 1 }} />
              <Chip label={`Semester ${user?.semester}`} variant="outlined" sx={{ mb: 2 }} />
              <Divider sx={{ my: 2 }} />
              <Box sx={{ textAlign: 'left' }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                  <strong>USN:</strong> {user?.usn}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                  <strong>Phone:</strong> {user?.phone || 'Not provided'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>CGPA:</strong> {profileData.cgpa || 'Not set'}
                </Typography>
              </Box>
            </Paper>

            {/* Resume Section */}
            <Paper sx={{ p: 3, borderRadius: 3, mt: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Description sx={{ mr: 1, color: '#667eea' }} />
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Resume
                </Typography>
              </Box>
              {profileData.resume ? (
                <Box>
                  <Button 
                    variant="outlined" 
                    fullWidth 
                    sx={{ mb: 1 }}
                    onClick={() => window.open(`http://localhost:5000${profileData.resume}`, '_blank')}
                  >
                    View Resume
                  </Button>
                  {editing && (
                    <Button
                      variant="contained"
                      component="label"
                      fullWidth
                      startIcon={<CloudUpload />}
                    >
                      Update Resume
                      <input type="file" hidden accept=".pdf,.doc,.docx" onChange={handleResumeUpload} />
                    </Button>
                  )}
                </Box>
              ) : (
                <Button
                  variant="contained"
                  component="label"
                  fullWidth
                  startIcon={<CloudUpload />}
                  disabled={!editing}
                >
                  Upload Resume
                  <input type="file" hidden accept=".pdf,.doc,.docx" onChange={handleResumeUpload} />
                </Button>
              )}
            </Paper>
          </Grid>

          {/* Right Column - Detailed Info */}
          <Grid item xs={12} md={8}>
            {/* Bio Section */}
            <Paper sx={{ p: 3, borderRadius: 3, mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                About Me
              </Typography>
              {editing ? (
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  value={profileData.bio}
                  onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                  placeholder="Write something about yourself..."
                />
              ) : (
                <Typography variant="body1">
                  {profileData.bio || 'No bio added yet.'}
                </Typography>
              )}
            </Paper>

            {/* CGPA Section */}
            {editing && (
              <Paper sx={{ p: 3, borderRadius: 3, mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                  Academic Performance
                </Typography>
                <TextField
                  label="CGPA"
                  type="number"
                  inputProps={{ min: 0, max: 10, step: 0.01 }}
                  value={profileData.cgpa}
                  onChange={(e) => setProfileData({ ...profileData, cgpa: e.target.value })}
                  sx={{ width: 200 }}
                />
              </Paper>
            )}

            {/* Skills Section */}
            <Paper sx={{ p: 3, borderRadius: 3, mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Code sx={{ mr: 1, color: '#667eea' }} />
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Skills
                  </Typography>
                </Box>
              </Box>
              {editing && (
                <Box sx={{ display: 'flex', mb: 2 }}>
                  <TextField
                    size="small"
                    placeholder="Add a skill..."
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                    sx={{ flexGrow: 1, mr: 1 }}
                  />
                  <Button variant="contained" startIcon={<Add />} onClick={handleAddSkill}>
                    Add
                  </Button>
                </Box>
              )}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {profileData.skills.length > 0 ? (
                  profileData.skills.map((skill, index) => (
                    <Chip
                      key={index}
                      label={skill}
                      color="primary"
                      variant={editing ? "filled" : "outlined"}
                      onDelete={editing ? () => handleRemoveSkill(skill) : undefined}
                    />
                  ))
                ) : (
                  <Typography color="text.secondary">No skills added yet.</Typography>
                )}
              </Box>
            </Paper>

            {/* Projects Section */}
            <Paper sx={{ p: 3, borderRadius: 3, mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <School sx={{ mr: 1, color: '#667eea' }} />
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Projects
                  </Typography>
                </Box>
                {editing && (
                  <Button 
                    variant="outlined" 
                    startIcon={<Add />}
                    onClick={() => setProjectDialog(true)}
                    size="small"
                  >
                    Add Project
                  </Button>
                )}
              </Box>
              {profileData.projects.length > 0 ? (
                <Grid container spacing={2}>
                  {profileData.projects.map((project, index) => (
                    <Grid item xs={12} key={index}>
                      <Card variant="outlined">
                        <CardContent>
                          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                            {project.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            {project.description}
                          </Typography>
                          <Box sx={{ mb: 1 }}>
                            {project.technologies?.map((tech, i) => (
                              <Chip key={i} label={tech} size="small" sx={{ mr: 0.5, mb: 0.5 }} />
                            ))}
                          </Box>
                          {project.link && (
                            <Button size="small" href={project.link} target="_blank">
                              View Project
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Typography color="text.secondary">No projects added yet.</Typography>
              )}
            </Paper>

            {/* Certifications Section */}
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <EmojiEvents sx={{ mr: 1, color: '#667eea' }} />
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Certifications
                  </Typography>
                </Box>
                {editing && (
                  <Button 
                    variant="outlined" 
                    startIcon={<Add />}
                    onClick={() => setCertDialog(true)}
                    size="small"
                  >
                    Add Certification
                  </Button>
                )}
              </Box>
              {profileData.certifications.length > 0 ? (
                <Grid container spacing={2}>
                  {profileData.certifications.map((cert, index) => (
                    <Grid item xs={12} key={index}>
                      <Card variant="outlined">
                        <CardContent>
                          <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                            {cert.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {cert.issuer}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {cert.date} {cert.credentialId && `• ID: ${cert.credentialId}`}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Typography color="text.secondary">No certifications added yet.</Typography>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Project Dialog */}
      <Dialog open={projectDialog} onClose={() => setProjectDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Project</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Project Title"
            value={currentProject.title}
            onChange={(e) => setCurrentProject({ ...currentProject, title: e.target.value })}
            sx={{ mt: 2, mb: 2 }}
          />
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Description"
            value={currentProject.description}
            onChange={(e) => setCurrentProject({ ...currentProject, description: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Technologies (comma separated)"
            value={currentProject.technologies}
            onChange={(e) => setCurrentProject({ ...currentProject, technologies: e.target.value })}
            placeholder="React, Node.js, MongoDB"
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Project Link (optional)"
            value={currentProject.link}
            onChange={(e) => setCurrentProject({ ...currentProject, link: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setProjectDialog(false)}>Cancel</Button>
          <Button onClick={handleAddProject} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>

      {/* Certification Dialog */}
      <Dialog open={certDialog} onClose={() => setCertDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Certification</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Certification Title"
            value={currentCert.title}
            onChange={(e) => setCurrentCert({ ...currentCert, title: e.target.value })}
            sx={{ mt: 2, mb: 2 }}
          />
          <TextField
            fullWidth
            label="Issuing Organization"
            value={currentCert.issuer}
            onChange={(e) => setCurrentCert({ ...currentCert, issuer: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Date"
            type="month"
            value={currentCert.date}
            onChange={(e) => setCurrentCert({ ...currentCert, date: e.target.value })}
            sx={{ mb: 2 }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            label="Credential ID (optional)"
            value={currentCert.credentialId}
            onChange={(e) => setCurrentCert({ ...currentCert, credentialId: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCertDialog(false)}>Cancel</Button>
          <Button onClick={handleAddCertification} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StudentProfile;
