import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import './login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook para navigação

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(username, password);
      console.log('Login successful', response.data);
      navigate('/');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div className='login-form-container'>
      <form onSubmit={handleSubmit}>
        <h1>COWORKING SPACE</h1>
        <div className='login-form-content'>
          <h2>Login</h2>
          <div className='login-form-group'>
            <input type='text' 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
              placeholder=''
            />
            <label>Username</label>
          </div>
          <div className='login-form-group'>
            <input type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required
              placeholder=''
            />
            <label>Password</label>
          </div>
          <div className='login-form-footer'>
            <button className='login-form-button' type="submit">Login</button>
            <a href='/register' className='login-register-button'>Cadastrar-se</a>
            <a href='/reset-password' className='login-reset-button'>Esqueceu a senha?</a>
          </div>
        </div>
      </form>
    </div>
    
  );
};

export default Login;