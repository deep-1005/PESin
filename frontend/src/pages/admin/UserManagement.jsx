import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  Tabs,
  Tab,
  IconButton,
  AppBar,
  Toolbar,
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArrowBack, CheckCircle, Cancel } from '@mui/icons-material';
import axios from 'axios';
import { toast } from 'react-toastify';

const UserManagement = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [pendingUsers, setPendingUsers] = useState([]);
  const [approvedUsers, setApprovedUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      // Fetch pending users
      const pendingResponse = await axios.get('/api/admin/pending-users');
      if (pendingResponse.data.success) {
        setPendingUsers(pendingResponse.data.data);
      }

      // Fetch all approved users
      const approvedResponse = await axios.get('/api/admin/users?approved=true');
      if (approvedResponse.data.success) {
        setApprovedUsers(approvedResponse.data.data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (userId) => {
    try {
      const response = await axios.put(`/api/admin/approve-user/${userId}`);
      if (response.data.success) {
        toast.success('User approved successfully!');
        fetchUsers(); // Refresh the list
      }
    } catch (error) {
      console.error('Error approving user:', error);
      toast.error(error.response?.data?.message || 'Failed to approve user');
    }
  };

  const handleReject = async (userId) => {
    try {
      const response = await axios.delete(`/api/admin/users/${userId}`);
      if (response.data.success) {
        toast.success('User rejected and removed');
        fetchUsers(); // Refresh the list
      }
    } catch (error) {
      console.error('Error rejecting user:', error);
      toast.error('Failed to reject user');
    }
  };

  const getRoleColor = (role) => {
    const colors = {
      student: 'primary',
      alumni: 'success',
      admin: 'error'
    };
    return colors[role] || 'default';
  };

  const renderUserTable = (users, showActions = false) => {
    if (users.length === 0) {
      return (
        <Alert severity="info" sx={{ mt: 2 }}>
          {showActions ? 'No pending approvals' : 'No approved users yet'}
        </Alert>
      );
    }

    return (
      <TableContainer component={Paper} sx={{ mt: 2, borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 50%, #1e88e5 100%)' }}>
              <TableCell sx={{ color: 'white', fontWeight: 700 }}>Name</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 700 }}>Email</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 700 }}>Role</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 700 }}>USN/Details</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 700 }}>Branch</TableCell>
              {showActions && (
                <TableCell sx={{ color: 'white', fontWeight: 700 }} align="right">
                  Actions
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow 
                key={user._id}
                sx={{ 
                  '&:hover': { background: '#f9fafb' },
                  transition: 'all 0.2s ease'
                }}
              >
                <TableCell>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {user.firstName} {user.lastName}
                  </Typography>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Chip 
                    label={user.role.toUpperCase()} 
                    color={getRoleColor(user.role)}
                    size="small"
                    sx={{ fontWeight: 600 }}
                  />
                </TableCell>
                <TableCell>
                  {user.usn ? (
                    <Typography variant="body2">{user.usn}</Typography>
                  ) : (
                    <Typography variant="body2" color="text.secondary">N/A</Typography>
                  )}
                </TableCell>
                <TableCell>
                  {user.branch ? (
                    <Chip label={user.branch} variant="outlined" size="small" />
                  ) : (
                    <Typography variant="body2" color="text.secondary">N/A</Typography>
                  )}
                </TableCell>
                {showActions && (
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      startIcon={<CheckCircle />}
                      onClick={() => handleApprove(user._id)}
                      sx={{ mr: 1 }}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      startIcon={<Cancel />}
                      onClick={() => handleReject(user._id)}
                    >
                      Reject
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
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
          <IconButton color="inherit" onClick={() => navigate('/admin/dashboard')}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 700, ml: 2 }}>
            User Management
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
            Manage Users
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Approve or reject user registrations and manage existing users
          </Typography>
        </Box>

        {/* Tabs */}
        <Paper sx={{ borderRadius: 2, mb: 3 }}>
          <Tabs 
            value={tabValue} 
            onChange={(e, newValue) => setTabValue(newValue)}
            sx={{
              '& .MuiTab-root': {
                fontWeight: 600,
                fontSize: '1rem'
              }
            }}
          >
            <Tab 
              label={`Pending Approvals (${pendingUsers.length})`}
              icon={
                <Chip 
                  label={pendingUsers.length} 
                  color="warning" 
                  size="small"
                  sx={{ ml: 1 }}
                />
              }
              iconPosition="end"
            />
            <Tab 
              label={`Approved Users (${approvedUsers.length})`}
              icon={
                <Chip 
                  label={approvedUsers.length} 
                  color="success" 
                  size="small"
                  sx={{ ml: 1 }}
                />
              }
              iconPosition="end"
            />
          </Tabs>
        </Paper>

        {/* Content */}
        {loading ? (
          <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 2 }}>
            <Typography>Loading users...</Typography>
          </Paper>
        ) : (
          <>
            {tabValue === 0 && renderUserTable(pendingUsers, true)}
            {tabValue === 1 && renderUserTable(approvedUsers, false)}
          </>
        )}
      </Container>
    </Box>
  );
};

export default UserManagement;
