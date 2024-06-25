const db = require('../models');
const Product = db.Product;

exports.createProduct = async (req, res) => {
  try {
    const { name, price } = req.body;
    const product = await Product.create({ name, price });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Implementar outras operações CRUD semelhantes
