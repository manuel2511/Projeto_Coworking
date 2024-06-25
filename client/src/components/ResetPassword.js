import React, { useState } from 'react';
import { resetPassword } from '../services/authService';

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
    <form onSubmit={handleSubmit}>
      <h2>Reset Password</h2>
      <div>
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>New Password</label>
        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
      </div>
      <button type="submit">Reset Password</button>
    </form>
  );
};

export default ResetPassword;
