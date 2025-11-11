import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function CreatePost() {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    if (!content.trim()) return setError('Content is required');
    try {
      await api.post('/posts', { content });
      navigate('/feed');
    } catch (err) {
      setError('Failed to create post');
    }
  }

  return (
    <div className="card">
      <h2>Create Post</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={onSubmit} className="form">
        <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Share something..." />
        <button type="submit">Post</button>
      </form>
    </div>
  );
}
