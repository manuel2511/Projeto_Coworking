const express = require('express');
const router = express.Router();
const paymentConditionRoutes = require('./paymentConditionRoutes');
const productRoutes = require('./productRoutes');
const reservationRoutes = require('./reservationRoutes');
const authRoutes = require('./auth');

// router.use('/auth', require('./auth'));
router.use('/api', authRoutes);
router.use('/products', productRoutes);
router.use('/payment-conditions', paymentConditionRoutes);
router.use('/reservations', reservationRoutes);
module.exports = router;
