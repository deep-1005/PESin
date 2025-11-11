import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="landing-page">
      <div className="landing-overlay">
        <div className="landing-content">
          <div className="logo-container">
            <h1 className="landing-title">PES<span className="logo-circle">in</span></h1>
            <p className="landing-tagline">Your College. Your Network. Your Future.</p>
          </div>
          
          <div className="landing-buttons">
            <Link to="/login" className="btn-landing btn-primary-landing">
              Sign In
            </Link>
            <Link to="/register" className="btn-landing btn-secondary-landing">
              Join Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
