import axios from 'axios';

const API_URL = '/reservations';

// export const createReservation = (products, paymentMethod) => {
//   return axios.post(API_URL, { products, paymentMethod });
// };

export const createReservation = async (reservationData) => {
  const response = await axios.post(API_URL, reservationData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.data;
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
