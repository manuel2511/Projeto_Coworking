import axios from 'axios';

const API_URL = '/products';

export const createProduct = (name, observation, photo, hourlyRate) => {
  return axios.post(API_URL, { name, observation, photo, hourlyRate });
};

export const getAllProducts = () => {
  return axios.get(API_URL);
};

export const getProductById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

export const updateProduct = (id, data) => {
  return axios.put(`${API_URL}/${id}`, data);
};

export const deleteProduct = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};
