const express = require('express');
const router = express.Router();
const paymentConditionRoutes = require('./paymentConditionRoutes');
const productRoutes = require('./productRoutes');

router.use('/auth', require('./auth'));
router.use('/products', productRoutes);
router.use('/payment-conditions', paymentConditionRoutes);
module.exports = router;
