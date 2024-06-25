import axios from 'axios';

const API_URL = '/auth';

export const register = (username, password, email) => {
  return axios.post(`${API_URL}/register`, { username, password, email });
};

export const login = (username, password) => {
  return axios.post(`${API_URL}/login`, { username, password });
};

export const resetPassword = (email, newPassword) => {
  return axios.post(`${API_URL}/reset-password`, { email, newPassword });
};
