import React, { useEffect, useState } from 'react';
import api from '../api';
import UserAvatar from '../components/UserAvatar';

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    api.get('/auth/me')
      .then(res => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  if (!user) return <div className="card">Login to view your profile.</div>;

  return (
    <div className="card">
      <div className="profile-head">
        <UserAvatar 
          name={user.name}
          profilePicture={user.profilePicture}
          size={96}
          className="avatar-large"
        />
        <h2>{user.name}</h2>
        <div className="muted">{user.headline}</div>
      </div>

      <div className="profile-body">
        <h3>About</h3>
        <p>{user.bio || 'No bio yet.'}</p>

        <h3>Work</h3>
        <p>{user.position || ''} {user.company ? `at ${user.company}` : ''}</p>

        <h3>Skills</h3>
        <div className="skills-container">
          {user.skills && user.skills.length > 0 ? (
            user.skills.map((skill, index) => (
              <span key={index} className="skill-badge">{skill}</span>
            ))
          ) : (
            <p>No skills listed.</p>
          )}
        </div>

        {user.recommendedCompany && (
          <>
            <h3>Recommended Company</h3>
            <div className="company-recommendation">
              <strong>{user.recommendedCompany}</strong>
              <p className="muted">Based on your primary skill: {user.skills && user.skills[0]}</p>
            </div>
          </>
        )}

        <h3>Connections</h3>
        <p>{(user.connections && user.connections.length) || 0} connections</p>
      </div>
    </div>
  );
}
