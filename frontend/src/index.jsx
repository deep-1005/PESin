import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles.css';

// Import pages
import SimpleLandingPage from './pages/SimpleLandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import StudentDashboard from './pages/student/StudentDashboard';
import StudentDirectory from './pages/student/StudentDirectory';
import StudentProfile from './pages/student/StudentProfile';
import Feed from './pages/student/Feed';
import CompanyRecommendations from './pages/student/CompanyRecommendations';
import CollegeInternalJobs from './pages/CollegeInternalJobs';
import SimpleAdminDashboard from './pages/admin/SimpleAdminDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import AlumniDashboard from './pages/alumni/AlumniDashboard';

// Protected Route wrapper
const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<SimpleLandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Student Routes */}
          <Route
            path="/student/dashboard"
            element={
              <ProtectedRoute>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/directory"
            element={
              <ProtectedRoute>
                <StudentDirectory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/profile"
            element={
              <ProtectedRoute>
                <StudentProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/college-jobs"
            element={
              <ProtectedRoute>
                <CollegeInternalJobs isAdmin={false} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/feed"
            element={
              <ProtectedRoute>
                <Feed />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/recommendations"
            element={
              <ProtectedRoute>
                <CompanyRecommendations />
              </ProtectedRoute>
            }
          />

          {/* Simple Admin Dashboard */}
          <Route
            path="/admin/simple"
            element={
              <ProtectedRoute>
                <SimpleAdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Full Admin Dashboard */}
                    <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/college-jobs"
            element={
              <ProtectedRoute>
                <CollegeInternalJobs isAdmin={true} />
              </ProtectedRoute>
            }
          />

          {/* Alumni Routes */}
          <Route
            path="/alumni/*"
            element={
              <ProtectedRoute>
                <AlumniDashboard />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </AuthProvider>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
