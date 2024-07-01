import React from 'react';
import { BrowserRouter as Router, Route, Routes,Navigate  } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Index from './components/Index';
import Login from './components/Login';
import Register from './components/Register';
import ResetPassword from './components/ResetPassword';
import PaymentConditionForm from './components/PaymentCondition/PaymentConditionForm';
import PaymentConditionList from './components/PaymentCondition/PaymentConditionList';
import ProductForm from './components/Product/ProductForm';
import ProductList from './components/Product/ProductList';
import ReservationForm  from './components/Reservation/ReservationForm';
import ReservationList  from './components/Reservation/ReservationList';
// import ProductList from './components/ProductList';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/" element={<PrivateRoute><Index /></PrivateRoute>} />
        <Route path="/cadastroPagamento" element={<PrivateRoute><PaymentConditionForm /></PrivateRoute>} />
        <Route path="/listaPagamento" element={<PrivateRoute><PaymentConditionList/></PrivateRoute>} />
        <Route path="/cadastroProduto" element={<PrivateRoute><ProductForm /></PrivateRoute>} />
        <Route path="/listaProduto" element={<PrivateRoute><ProductList /></PrivateRoute>} />
        <Route path="/cadastroReserva" element={<PrivateRoute><ReservationForm /></PrivateRoute>} />
        <Route path="/listaReserva" element={<PrivateRoute><ReservationList /></PrivateRoute>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
