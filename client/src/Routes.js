import React from 'react';
import { BrowserRouter as Router, Route, Routes,Navigate  } from 'react-router-dom';
import Index from './components/Index';
import Login from './components/Login';
import Register from './components/Register';
import ResetPassword from './components/ResetPassword';
import PaymentConditionForm from './components/PaymentCondition/PaymentConditionForm';
import PaymentConditionList from './components/PaymentCondition/PaymentConditionList';
// import ProductList from './components/ProductList';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/" element={<Index />} />
        <Route path="/cadastroPagamento" element={<PaymentConditionForm />} />
        <Route path="/listaPagamento" element={<PaymentConditionList />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
