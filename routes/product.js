const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/products', productController.createProduct);

// Adicione outras rotas CRUD

module.exports = router;
