import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from '../src/components/ProductList';
import Login from '../src/components/Login';
import Register from './components/Register';
import ResetPassword from './components/ResetPassword';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/login" component={Login} /> */}
        {/* <Route path="/register" component={Register} /> */}
        {/* <Route path="/reset-password" component={ResetPassword} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/resetPassword" element={<ResetPassword/>} />
        <Route path="/" element={<ProductList/>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
