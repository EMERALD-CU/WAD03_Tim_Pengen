const express = require('express');
const router = express.Router();

const productController = require('../Controllers/ProductControllers'); 
const authMiddleware = require('../Middleware/AuthMiddleware'); 
const isSeller = authMiddleware.isSeller; 

router.get('/', productController.getAllProducts);
router.get('/:name', productController.getProductByName);
router.post('/', isSeller, productController.createProduct);
router.patch('/:name', isSeller, productController.updateProduct);
router.put('/:name', isSeller, productController.updateProduct);
router.delete('/:name', isSeller, productController.deleteProduct);

module.exports = router;