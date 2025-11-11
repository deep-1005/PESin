import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Button, 
  Grid,
  Card,
  CardContent,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  IconButton,
  AppBar,
  Toolbar
} from '@mui/material';
import {
  People,
  Business,
  Work,
  School,
  Assessment,
  CheckCircle,
  Cancel,
  Edit,
  Delete,
  Add,
  Logout,
  ArrowBack
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const SimpleAdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState(0);
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalAlumni: 0,
    totalCompanies: 0,
    totalJobs: 0,
    pendingUsers: 0
  });

  // Data states
  const [pendingUsers, setPendingUsers] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [internalJobs, setInternalJobs] = useState([]);
  const [applications, setApplications] = useState([]);

  // Dialog states
  const [openCompanyDialog, setOpenCompanyDialog] = useState(false);
  const [openJobDialog, setOpenJobDialog] = useState(false);
  const [newCompany, setNewCompany] = useState({ name: '', industry: '', location: '' });
  const [newJob, setNewJob] = useState({ 
    title: '', 
    department: '', 
    type: 'Teaching Assistant',
    description: '',
    stipend: ''
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Load statistics
      const statsRes = await axios.get('/api/admin/stats');
      if (statsRes.data.success) {
        setStats(statsRes.data.data);
      }

      // Load pending users
      const usersRes = await axios.get('/api/admin/pending-users');
      if (usersRes.data.success) {
        setPendingUsers(usersRes.data.data);
      }

      // Load companies
      const companiesRes = await axios.get('/api/companies');
      if (companiesRes.data.success) {
        setCompanies(companiesRes.data.data);
      }

      // Load internal jobs
      const jobsRes = await axios.get('/api/admin/internal-jobs');
      if (jobsRes.data.success) {
        setInternalJobs(jobsRes.data.data);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleApproveUser = async (userId) => {
    try {
      const res = await axios.put(`/api/admin/approve-user/${userId}`);
      if (res.data.success) {
        toast.success('User approved successfully!');
        loadDashboardData();
      }
    } catch (error) {
      toast.error('Failed to approve user');
    }
  };

  const handleRejectUser = async (userId) => {
    try {
      const res = await axios.delete(`/api/admin/reject-user/${userId}`);
      if (res.data.success) {
        toast.success('User rejected');
        loadDashboardData();
      }
    } catch (error) {
      toast.error('Failed to reject user');
    }
  };

  const handleAddCompany = async () => {
    try {
      const res = await axios.post('/api/admin/companies', newCompany);
      if (res.data.success) {
        toast.success('Company added successfully!');
        setOpenCompanyDialog(false);
        setNewCompany({ name: '', industry: '', location: '' });
        loadDashboardData();
      }
    } catch (error) {
      toast.error('Failed to add company');
    }
  };

  const handleAddInternalJob = async () => {
    try {
      const res = await axios.post('/api/admin/internal-jobs', newJob);
      if (res.data.success) {
        toast.success('Job posted successfully!');
        setOpenJobDialog(false);
        setNewJob({ title: '', department: '', type: 'Teaching Assistant', description: '', stipend: '' });
        loadDashboardData();
      }
    } catch (error) {
      toast.error('Failed to post job');
    }
  };

  const handleDeleteCompany = async (companyId) => {
    if (window.confirm('Are you sure you want to delete this company?')) {
      try {
        const res = await axios.delete(`/api/admin/companies/${companyId}`);
        if (res.data.success) {
          toast.success('Company deleted');
          loadDashboardData();
        }
      } catch (error) {
        toast.error('Failed to delete company');
      }
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        const res = await axios.delete(`/api/admin/internal-jobs/${jobId}`);
        if (res.data.success) {
          toast.success('Job deleted');
          loadDashboardData();
        }
      } catch (error) {
        toast.error('Failed to delete job');
      }
    }
  };

  // Stats Cards Component
  const StatCard = ({ title, value, icon, color }) => (
    <Card sx={{ height: '100%', background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)` }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h4" sx={{ color: 'white', fontWeight: 700 }}>
              {value}
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)', mt: 1 }}>
              {title}
            </Typography>
          </Box>
          <Box sx={{ color: 'white', opacity: 0.8 }}>
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ minHeight: '100vh', background: '#f5f7fa' }}>
      {/* Header */}
      <AppBar position="static" sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <Toolbar>
          <IconButton color="inherit" onClick={() => navigate(-1)} sx={{ mr: 2 }}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 700 }}>
            Admin Dashboard
          </Typography>
          <Typography variant="body1" sx={{ mr: 2 }}>
            {user?.firstName} {user?.lastName}
          </Typography>
          <Button color="inherit" startIcon={<Logout />} onClick={logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Welcome Section */}
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
          Welcome, {user?.firstName}! 👋
        </Typography>

        {/* Statistics Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={2.4}>
            <StatCard 
              title="Students" 
              value={stats.totalStudents} 
              icon={<School sx={{ fontSize: 40 }} />}
              color="#667eea"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <StatCard 
              title="Alumni" 
              value={stats.totalAlumni} 
              icon={<People sx={{ fontSize: 40 }} />}
              color="#764ba2"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <StatCard 
              title="Companies" 
              value={stats.totalCompanies} 
              icon={<Business sx={{ fontSize: 40 }} />}
              color="#f093fb"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <StatCard 
              title="Jobs" 
              value={stats.totalJobs} 
              icon={<Work sx={{ fontSize: 40 }} />}
              color="#4facfe"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <StatCard 
              title="Pending Approvals" 
              value={stats.pendingUsers} 
              icon={<Assessment sx={{ fontSize: 40 }} />}
              color="#fa709a"
            />
          </Grid>
        </Grid>

        {/* Main Content Tabs */}
        <Paper sx={{ borderRadius: 3 }}>
          <Tabs 
            value={currentTab} 
            onChange={(e, newValue) => setCurrentTab(newValue)}
            sx={{ borderBottom: 1, borderColor: 'divider', px: 2 }}
          >
            <Tab label="Pending Users" />
            <Tab label="Companies" />
            <Tab label="Internal Jobs" />
          </Tabs>

          <Box sx={{ p: 3 }}>
            {/* Tab 0: Pending Users */}
            {currentTab === 0 && (
              <Box>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Approve or Reject Users
                </Typography>
                {pendingUsers.length === 0 ? (
                  <Typography color="text.secondary">No pending approvals</Typography>
                ) : (
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell><strong>Name</strong></TableCell>
                          <TableCell><strong>Email</strong></TableCell>
                          <TableCell><strong>Role</strong></TableCell>
                          <TableCell><strong>USN/Details</strong></TableCell>
                          <TableCell><strong>Actions</strong></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {pendingUsers.map((user) => (
                          <TableRow key={user._id}>
                            <TableCell>{user.firstName} {user.lastName}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                              <Chip 
                                label={user.role} 
                                size="small" 
                                color={user.role === 'student' ? 'primary' : 'secondary'}
                              />
                            </TableCell>
                            <TableCell>{user.usn || user.branch || '-'}</TableCell>
                            <TableCell>
                              <Button
                                size="small"
                                variant="contained"
                                color="success"
                                startIcon={<CheckCircle />}
                                onClick={() => handleApproveUser(user._id)}
                                sx={{ mr: 1 }}
                              >
                                Approve
                              </Button>
                              <Button
                                size="small"
                                variant="outlined"
                                color="error"
                                startIcon={<Cancel />}
                                onClick={() => handleRejectUser(user._id)}
                              >
                                Reject
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </Box>
            )}

            {/* Tab 1: Companies */}
            {currentTab === 1 && (
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Company Database
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => setOpenCompanyDialog(true)}
                  >
                    Add Company
                  </Button>
                </Box>
                {companies.length === 0 ? (
                  <Typography color="text.secondary">No companies added yet</Typography>
                ) : (
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell><strong>Company Name</strong></TableCell>
                          <TableCell><strong>Industry</strong></TableCell>
                          <TableCell><strong>Location</strong></TableCell>
                          <TableCell><strong>Actions</strong></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {companies.map((company) => (
                          <TableRow key={company._id}>
                            <TableCell>{company.name}</TableCell>
                            <TableCell>{company.industry}</TableCell>
                            <TableCell>{company.location}</TableCell>
                            <TableCell>
                              <IconButton 
                                size="small" 
                                color="error"
                                onClick={() => handleDeleteCompany(company._id)}
                              >
                                <Delete />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </Box>
            )}

            {/* Tab 2: Internal Jobs */}
            {currentTab === 2 && (
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Internal Job Postings
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => setOpenJobDialog(true)}
                  >
                    Post Job
                  </Button>
                </Box>
                {internalJobs.length === 0 ? (
                  <Typography color="text.secondary">No internal jobs posted yet</Typography>
                ) : (
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell><strong>Title</strong></TableCell>
                          <TableCell><strong>Department</strong></TableCell>
                          <TableCell><strong>Type</strong></TableCell>
                          <TableCell><strong>Stipend</strong></TableCell>
                          <TableCell><strong>Actions</strong></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {internalJobs.map((job) => (
                          <TableRow key={job._id}>
                            <TableCell>{job.title}</TableCell>
                            <TableCell>{job.department}</TableCell>
                            <TableCell>
                              <Chip label={job.type} size="small" color="primary" />
                            </TableCell>
                            <TableCell>₹{job.stipend}/month</TableCell>
                            <TableCell>
                              <IconButton 
                                size="small" 
                                color="error"
                                onClick={() => handleDeleteJob(job._id)}
                              >
                                <Delete />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </Box>
            )}
          </Box>
        </Paper>
      </Container>

      {/* Add Company Dialog */}
      <Dialog open={openCompanyDialog} onClose={() => setOpenCompanyDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Company</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Company Name"
            value={newCompany.name}
            onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
            sx={{ mt: 2, mb: 2 }}
          />
          <TextField
            fullWidth
            label="Industry"
            value={newCompany.industry}
            onChange={(e) => setNewCompany({ ...newCompany, industry: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Location"
            value={newCompany.location}
            onChange={(e) => setNewCompany({ ...newCompany, location: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCompanyDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddCompany}>Add Company</Button>
        </DialogActions>
      </Dialog>

      {/* Add Job Dialog */}
      <Dialog open={openJobDialog} onClose={() => setOpenJobDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Post Internal Job</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Job Title"
            value={newJob.title}
            onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
            sx={{ mt: 2, mb: 2 }}
          />
          <TextField
            fullWidth
            label="Department"
            value={newJob.department}
            onChange={(e) => setNewJob({ ...newJob, department: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            select
            label="Job Type"
            value={newJob.type}
            onChange={(e) => setNewJob({ ...newJob, type: e.target.value })}
            sx={{ mb: 2 }}
            SelectProps={{ native: true }}
          >
            <option value="Teaching Assistant">Teaching Assistant</option>
            <option value="Research Assistant">Research Assistant</option>
            <option value="Lab Assistant">Lab Assistant</option>
            <option value="Event Volunteer">Event Volunteer</option>
            <option value="Department Assistant">Department Assistant</option>
          </TextField>
          <TextField
            fullWidth
            label="Description"
            multiline
            rows={3}
            value={newJob.description}
            onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Monthly Stipend (₹)"
            type="number"
            value={newJob.stipend}
            onChange={(e) => setNewJob({ ...newJob, stipend: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenJobDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddInternalJob}>Post Job</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SimpleAdminDashboard;
