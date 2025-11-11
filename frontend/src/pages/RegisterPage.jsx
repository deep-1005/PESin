import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  MenuItem,
  Grid
} from '@mui/material';
import { Visibility, VisibilityOff, PersonAdd } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'student',
    usn: '',
    branch: '',
    semester: '',
    phone: ''
  });

  const branches = ['CSE', 'ECE', 'EEE', 'ME', 'CE', 'ISE', 'ETE', 'BT'];
  const semesters = [1, 2, 3, 4, 5, 6, 7, 8];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Prepare data with proper types
    const registrationData = {
      ...formData,
      semester: formData.semester ? Number(formData.semester) : undefined
    };

    // Remove empty optional fields
    if (!registrationData.phone) delete registrationData.phone;
    if (!registrationData.usn) delete registrationData.usn;
    if (!registrationData.branch) delete registrationData.branch;
    if (!registrationData.semester) delete registrationData.semester;

    const result = await register(registrationData);

    if (result.success) {
      toast.success(result.message);
      setTimeout(() => {
        if (result.user.role === 'student') {
          navigate('/student/dashboard');
        } else if (result.user.role === 'alumni') {
          navigate('/alumni/dashboard');
        } else if (result.user.role === 'admin') {
          navigate('/admin/dashboard');
        }
      }, 1500);
    } else {
      toast.error(result.message);
    }

    setLoading(false);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 50%, #1e88e5 100%)',
        py: 6,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '-10%',
          right: '-10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          animation: 'float 6s ease-in-out infinite'
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: '-10%',
          left: '-10%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.08)',
          animation: 'float 8s ease-in-out infinite reverse'
        }
      }}
    >
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Paper 
            elevation={24} 
            sx={{ 
              p: 5, 
              borderRadius: 4,
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}
          >
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  mb: 1,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Join PESin 🚀
              </Typography>
              <Typography variant="body1" sx={{ color: '#6b7280' }}>
                Create your account to get started
              </Typography>
            </Box>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="example@pes.edu"
                    helperText="Use your PES email address"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    required
                    inputProps={{
                      minLength: 6
                    }}
                    helperText="Password must be at least 6 characters"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    select
                    label="Role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                  >
                    <MenuItem value="student">Student</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                  </TextField>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </Grid>

                {formData.role === 'student' && (
                  <>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="USN"
                        name="usn"
                        value={formData.usn}
                        onChange={handleChange}
                        required
                        placeholder="e.g., PES1UG20CS001"
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        select
                        label="Branch"
                        name="branch"
                        value={formData.branch}
                        onChange={handleChange}
                        required
                      >
                        {branches.map((branch) => (
                          <MenuItem key={branch} value={branch}>
                            {branch}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        select
                        label="Semester"
                        name="semester"
                        value={formData.semester}
                        onChange={handleChange}
                        required
                      >
                        {semesters.map((sem) => (
                          <MenuItem key={sem} value={sem}>
                            Semester {sem}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                  </>
                )}
              </Grid>

              <Button
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                startIcon={<PersonAdd />}
                sx={{
                  mt: 4,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  '&:hover': {
                    background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                  }
                }}
              >
                {loading ? 'Creating Account...' : 'Register'}
              </Button>

              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Typography variant="body2" sx={{ color: '#6b7280' }}>
                  Already have an account?{' '}
                  <Link
                    to="/login"
                    style={{ color: '#667eea', fontWeight: 600, textDecoration: 'none' }}
                  >
                    Login here
                  </Link>
                </Typography>
              </Box>
            </form>
          </Paper>

          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Button
              variant="text"
              onClick={() => navigate('/')}
              sx={{ color: 'white', fontWeight: 600 }}
            >
              ← Back to Home
            </Button>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default RegisterPage;
