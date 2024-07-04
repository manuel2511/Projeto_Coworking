import { jwtDecode } from 'jwt-decode';

export const getUserInfo = () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decoded = jwtDecode(token);
      return {
        id: decoded.id,
        name: decoded.name,
        master: decoded.master,
      };
    } catch (error) {
      console.error('Invalid token:', error);
    }
  }
  return null;
};

export const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login'; // ou use o método do react-router para redirecionar
  };