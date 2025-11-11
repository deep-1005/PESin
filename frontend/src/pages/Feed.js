import React, { useEffect, useState } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';
import UserAvatar from '../components/UserAvatar';

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/posts')
      .then(res => setPosts(res.data))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="card">Loading feed...</div>;

  return (
    <div className="card">
      <div className="card-header">
        <h2>Feed</h2>
        <Link to="/create" className="btn">Create Post</Link>
      </div>

      {posts.length === 0 && <p>No posts yet.</p>}

      {posts.map(p => (
        <div key={p._id} className="post">
          <div className="post-head">
            <UserAvatar 
              name={p.user?.name || 'User'}
              profilePicture={p.user?.profilePicture}
              size={52}
              className="avatar"
            />
            <div>
              <strong>{p.user?.name}</strong>
              <div className="muted">{new Date(p.createdAt).toLocaleString()}</div>
            </div>
          </div>
          <div className="post-body">{p.content}</div>
          <div className="post-footer">Likes: {p.likes?.length || 0} • Comments: {p.comments?.length || 0}</div>
        </div>
      ))}
    </div>
  );
}
