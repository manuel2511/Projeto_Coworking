import axios from 'axios';

const API_URL = '/api/products';

export const fetchProducts = () => {
  return axios.get(API_URL);
};
