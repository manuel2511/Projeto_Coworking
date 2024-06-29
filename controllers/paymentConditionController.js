const { PaymentCondition } = require('../models');

exports.create = async (req, res) => {
  try {
    const paymentCondition = await PaymentCondition.create(req.body);
    res.status(201).json(paymentCondition);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const paymentConditions = await PaymentCondition.findAll();
    res.status(200).json(paymentConditions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Adicione mais métodos conforme necessário (findOne, update, delete)
