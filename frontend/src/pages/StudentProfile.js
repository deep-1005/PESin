import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import UserAvatar from '../components/UserAvatar';

export default function StudentProfile() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/users/profile/${id}`)
      .then(res => setStudent(res.data))
      .catch(() => setStudent(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="card">Loading profile...</div>;
  if (!student) return <div className="card">Student not found.</div>;

  return (
    <div className="card">
      <button onClick={() => navigate('/students')} className="btn-back">← Back to Students</button>
      
      <div className="profile-head">
        <UserAvatar 
          name={student.name}
          profilePicture={student.profilePicture}
          size={96}
          className="avatar-large"
        />
        <h2>{student.name}</h2>
        <div className="muted">{student.headline}</div>
        {student.location && <div className="muted">📍 {student.location}</div>}
      </div>

      <div className="profile-body">
        <h3>About</h3>
        <p>{student.bio || 'No bio available.'}</p>

        <h3>Current Role</h3>
        <p>{student.position || 'Student'} {student.company ? `at ${student.company}` : ''}</p>

        <h3>Skills</h3>
        <div className="skills-container">
          {student.skills && student.skills.length > 0 ? (
            student.skills.map((skill, index) => (
              <span key={index} className="skill-badge">{skill}</span>
            ))
          ) : (
            <p>No skills listed.</p>
          )}
        </div>

        {student.recommendedCompany && student.skills && student.skills.length > 0 && (
          <>
            <h3>🎯 Recommended Company</h3>
            <div className="company-recommendation">
              <div className="company-name">{student.recommendedCompany}</div>
              <p className="recommendation-reason">
                Best match based on primary skill: <strong>{student.skills[0]}</strong>
              </p>
              <p className="muted small">This company is looking for professionals with expertise in {student.skills[0]}</p>
            </div>
          </>
        )}

        <h3>Connections</h3>
        <p>{(student.connections && student.connections.length) || 0} connections</p>
      </div>
    </div>
  );
}
