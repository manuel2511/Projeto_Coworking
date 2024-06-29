import axios from 'axios';

const API_URL = '/payment-conditions';

export const createPaymentCondition = (name, description) => {
  return axios.post(API_URL, { name });
};

export const getAllPaymentConditions = () => {
  return axios.get(API_URL);
};

// Adicione mais funções conforme necessário (update, delete, etc.)