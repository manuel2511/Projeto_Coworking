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
    <div className='reset-form-container'>
    <form onSubmit={handleSubmit}>
      <h1>COWORKING SPACE</h1>
      <div className='reset-form-content'>
        <h2>Recuperar senha</h2>
        <div className='reset-form-group'>
          <input type='text' 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            placeholder=''
          />
          <label>Email</label>
        </div>
        <div className='reset-form-group'>
          <input type="password" 
            value={newPassword} 
            onChange={(e) => setNewPassword(e.target.value)} 
            required
            placeholder=''
          />
          <label>Nova senha</label>
        </div>
        <div className='reset-form-footer'>
          <button className='reset-form-button' type="submit">Salvar</button>
          <a href='/' className='login-page-button'>voltar</a>
        </div>
      </div>
    </form>
  </div>
  );
};

export default ResetPassword;