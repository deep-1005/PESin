import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      const res = await api.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      if (onLogin) onLogin(res.data.user);
      navigate('/feed');
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed');
    }
  }

  return (
    <div className="card">
      <h2>Login</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={onSubmit} className="form">
        <input name="email" value={form.email} onChange={onChange} placeholder="Email" />
        <input name="password" type="password" value={form.password} onChange={onChange} placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
