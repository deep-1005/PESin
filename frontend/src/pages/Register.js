import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function Register({ onRegister }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      const res = await api.post('/auth/register', form);
      localStorage.setItem('token', res.data.token);
      if (onRegister) onRegister(res.data.user);
      navigate('/feed');
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed');
    }
  }

  return (
    <div className="card">
      <h2>Register</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={onSubmit} className="form">
        <input name="name" value={form.name} onChange={onChange} placeholder="Full name" />
        <input name="email" value={form.email} onChange={onChange} placeholder="Email" />
        <input name="password" type="password" value={form.password} onChange={onChange} placeholder="Password" />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
