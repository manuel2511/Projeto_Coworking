import axios from 'axios';

const API_URL = '/reservations';

export const createReservation = (products, paymentMethod) => {
  return axios.post(API_URL, { products, paymentMethod });
};

export const getAllReservations = () => {
  return axios.get(API_URL);
};

export const getReservationById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

export const updateReservation = (id, data) => {
  return axios.put(`${API_URL}/${id}`, data);
};

export const deleteReservation = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};
