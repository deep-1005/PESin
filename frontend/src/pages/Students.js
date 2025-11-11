import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import UserAvatar from '../components/UserAvatar';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/users/all')
      .then(res => setStudents(res.data))
      .catch(() => setStudents([]))
      .finally(() => setLoading(false));
  }, []);

  function viewProfile(userId) {
    navigate(`/student/${userId}`);
  }

  if (loading) return <div className="card">Loading students...</div>;

  return (
    <div className="card">
      <h2>All Students</h2>
      <p className="muted">{students.length} students registered</p>

      <div className="students-grid">
        {students.map(student => (
          <div key={student._id} className="student-card" onClick={() => viewProfile(student._id)}>
            <UserAvatar 
              name={student.name}
              profilePicture={student.profilePicture}
              size={52}
              className="avatar"
            />
            <div className="student-info">
              <strong>{student.name}</strong>
              <div className="muted">{student.headline}</div>
              {student.location && <div className="muted small">📍 {student.location}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
