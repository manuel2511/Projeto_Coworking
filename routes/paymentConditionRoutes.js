const express = require('express');
const router = express.Router();
const paymentConditionController = require('../controllers/paymentConditionController');

router.post('/', paymentConditionController.create);
router.get('/', paymentConditionController.findAll);

// Adicione mais rotas conforme necessário (get by id, update, delete)

module.exports = router;
