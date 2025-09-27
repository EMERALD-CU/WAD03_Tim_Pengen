// routes/ProductRoutes.js

const express = require('express');
const router = express.Router();

// 1. Import Product Controllers untuk handlers (sesuai nama file ini)
const productController = require('../Controllers/ProductControllers'); 

// 2. Import User Controllers HANYA untuk middleware isSeller (isSeller ada di sana)
// CATATAN: Pastikan Anda menggunakan penamaan folder yang BENAR (e.g., Controllers atau controllers)
const userController = require('../Controllers/UserControllers'); 


// --- Ambil Middleware isSeller ---
const isSeller = userController.isSeller; 


// --- READ Endpoints (Akses Publik) ---
router.get('/', productController.getProducts); 
router.get('/:product_name', productController.getProductByName); 


// --- WRITE/MODIFY Endpoints (Hanya untuk Seller) ---
// Gunakan isSeller middleware yang diimpor
router.post('/', userController.isSeller, productController.createProduct); 
router.patch('/:product_name', isSeller, productController.updateProduct);
router.put('/:product_name', isSeller, productController.updateProduct); 
router.delete('/:product_name', isSeller, productController.deleteProduct); 

module.exports = router;