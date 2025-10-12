const express = require('express');
const router = express.Router();

const productController = require('../Controllers/ProductControllers'); 
const authMiddleware = require('../Middleware/AuthMiddleware'); 
const isSeller = authMiddleware.isSeller; 

router.get('/', productController.getProducts); 
router.get('/:product_name', productController.getProductByName); 
router.post('/', userController.isSeller, productController.createProduct); 
router.patch('/:product_name', isSeller, productController.updateProduct);
router.put('/:product_name', isSeller, productController.updateProduct); 
router.delete('/:product_name', isSeller, productController.deleteProduct); 

module.exports = router;