import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/authService';
import './register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate(); // Hook para navigação

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register(username, password, email);
      console.log('Registration successful', response.data);
      navigate('/login');
    } catch (error) {
      console.error('Registration failed', error);
      alert('Registration failed', error);
    }
  };

  return (
    <div className='register-form-container'>
      <form onSubmit={handleSubmit}>
        <h1>COWORKING SPACE</h1>
        <div className='register-form-content'>
          <h2>Register</h2>
          <div className='register-form-group'>
            <input 
              type="email"
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder=''
            />
            <label>Email</label>
          </div>
          <div className='register-form-group'>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required
              placeholder=''
            />
            <label>Username</label>
          </div>
          <div className='register-form-group'>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required
              placeholder=''
            />
            <label>Senha</label>
          </div>
          <div className='register-form-group'>
            <input 
              type="password"
              value={repeatPassword} 
              onChange={(e) => setRepeatPassword(e.target.value)} 
              required
              placeholder=''
            />
            <label>Repetir Senha</label>
          </div>
          <div className='register-form-footer'>
            <button className='register-form-button' type="submit">Register</button>
            <a href='/' className='register-login-button'>Já possui cadastro? Faça login</a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;