const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
/*const upload = require('../middleware/upload'); // Importar o middleware de upload *?

/*router.post('/', upload.single('photo'), productController.create); // Aplicar o middleware na rota de criação */
router.get('/', productController.findAll);
router.get('/:id', productController.findById);
router.put('/:id', productController.update);
router.delete('/:id', productController.delete);

module.exports = router;
