import React, { useState } from 'react';
import { login } from '../services/authService';
import './login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(username, password);
      console.log('Login successful', response.data);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div className='form-container'>
      <form onSubmit={handleSubmit}>
        <h1>COWORKING SPACE</h1>
        <div className='form-content'>
          <h2>Login</h2>
          <div className='form-group'>
            <input type='text' 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
              placeholder=''
            />
            <label>Username</label>
          </div>
          <div className='form-group'>
            <input type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required
              placeholder=''
            />
            <label>Password</label>
          </div>
          <div className='form-footer'>
            <button className='login-button' type="submit">Login</button>
            <a href='/register' className='register-button'>Cadastrar-se</a>
            <a href='/reset-password' className='reset-password-button'>Esqueceu a senha?</a>
          </div>
        </div>
      </form>
    </div>
    
  );
};

export default Login;
