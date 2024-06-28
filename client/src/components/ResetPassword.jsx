import React, { useState } from 'react';
import { resetPassword } from '../services/authService';
import './resetPassword.css';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await resetPassword(email, newPassword);
      console.log('Password reset successful', response.data);
    } catch (error) {
      console.error('Password reset failed', error);
    }
  };

  return (
    <div className='form-container'>
    <form onSubmit={handleSubmit}>
      <h1>COWORKING SPACE</h1>
      <div className='form-content'>
        <h2>Recuperar senha</h2>
        <div className='form-group'>
          <input type='text' 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            placeholder=''
          />
          <label>Email</label>
        </div>
        <div className='form-group'>
          <input type="password" 
            value={newPassword} 
            onChange={(e) => setNewPassword(e.target.value)} 
            required
            placeholder=''
          />
          <label>Nova senha</label>
        </div>
        <div className='form-footer'>
          <button className='login-button' type="submit">Salvar</button>
          <a href='/' className='reset-password-button'>voltar</a>
        </div>
      </div>
    </form>
  </div>
  );
};

export default ResetPassword;