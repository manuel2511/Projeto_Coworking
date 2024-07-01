const express = require('express');
const multer = require('multer');
const router = express.Router();
const productController = require('../controllers/productController');

// Configuração do multer para upload de arquivos
const upload = multer({ dest: 'upload/' });

router.post('/', upload.single('photo'), productController.create)
router.get('/', productController.findAll);
router.get('/:id', productController.findById);
router.put('/:id', productController.update);
router.delete('/:id', productController.delete);

module.exports = router;
