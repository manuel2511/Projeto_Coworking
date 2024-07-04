import React, { useState } from 'react';
import { resetPassword } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import './resetPassword.css'; // Importação do css

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate(); // Hook para navegação

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await resetPassword(email, newPassword);
      console.log('Password reset successful', response.data);
      alert("Senha alterada com sucesso!");
      navigate('/login');
    } catch (error) {
      console.error('Password reset failed', error);
      if (error.response && error.response.status === 404) {
        alert('Email não encontrado. Verifique o email digitado.');
      } else {
        alert('Erro ao redefinir a senha. Tente novamente mais tarde.');
      }
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
          <a href='/login' className='login-page-button'>voltar</a>
        </div>
      </div>
    </form>
  </div>
  );
};

export default ResetPassword;