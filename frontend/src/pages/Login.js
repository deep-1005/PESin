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
      // backend nests response under `data` -> { user, token }
      const token = res.data?.data?.token;
      const user = res.data?.data?.user;
      if (!token) {
        throw new Error('No token received from server');
      }
      localStorage.setItem('token', token);
      if (onLogin) onLogin(user);
      navigate('/feed');
    } catch (err) {
      // backend uses `message` for errors
      const serverMessage = err.response?.data?.message || err.response?.data?.msg;
      setError(serverMessage || err.message || 'Login failed');
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
