import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import api from './api';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Feed from './pages/Feed';
import Profile from './pages/Profile';
import CreatePost from './pages/CreatePost';
import Students from './pages/Students';
import StudentProfile from './pages/StudentProfile';

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.get('/auth/me')
        .then(res => setUser(res.data))
        .catch(() => {
          localStorage.removeItem('token');
          setUser(null);
        });
    }
  }, []);

  function logout() {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  }

  // Hide navbar on landing page
  const isLandingPage = location.pathname === '/';

  return (
    <div className="app-root">
      {!isLandingPage && (
        <nav className="nav">
          <Link to="/feed">PESin</Link>
          <div className="nav-right">
            {user ? (
              <>
                <Link to="/feed">Feed</Link>
                <Link to="/students">Students</Link>
                <Link to="/create">Create</Link>
                <Link to="/profile">Profile</Link>
                <button onClick={logout} className="btn-link">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            )}
          </div>
        </nav>
      )}

      <main className={isLandingPage ? '' : 'main'}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/students" element={<Students />} />
          <Route path="/student/:id" element={<StudentProfile />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login onLogin={setUser} />} />
          <Route path="/register" element={<Register onRegister={setUser} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
