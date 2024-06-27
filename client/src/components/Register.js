import React, { useState } from 'react';
import { register } from '../services/authService';
import './register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register(username, password, email);
      console.log('Registration successful', response.data);
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <div>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        <label>Username</label>
      </div>
      <div>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <label>Password</label>
      </div>
      <div>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Email</label>
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
