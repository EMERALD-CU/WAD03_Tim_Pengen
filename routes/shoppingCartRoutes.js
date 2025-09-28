// routes/ShoppingCartRoutes.js

const express = require('express');
const router = express.Router();

// 1. Import Shopping Cart Controller untuk handlers
const shoppingCartController = require('../Controllers/ShoppingCartControllers'); 

// 2. Import User Controller HANYA untuk middleware isBuyer
const userController = require('../Controllers/UserControllers'); 

// --- Ambil Middleware isBuyer ---
const isBuyer = userController.isBuyer;


// --- Shopping Cart Endpoints (Hanya untuk Buyer yang bersangkutan) ---
// Semua endpoint di bawah ini dilindungi oleh middleware 'isBuyer'
// Middleware ini memastikan hanya pengguna dengan peran 'buyer' yang bisa mengakses keranjangnya.

// 1. GET /cart/:username -> Mendapatkan isi keranjang
router.get('/:username', isBuyer, shoppingCartController.getCartByUsername);

// 2. POST /cart/:username/add -> Menambahkan produk ke keranjang
router.post('/:username/add', isBuyer, shoppingCartController.addProductToCart);

// 3. PATCH /cart/:username/update -> Mengubah kuantitas item
router.patch('/:username/update', isBuyer, shoppingCartController.updateProductQuantity);

//    (Menambahkan PUT untuk konsistensi dengan routes lain)
router.put('/:username/update', isBuyer, shoppingCartController.updateProductQuantity);

// 4. DELETE /cart/:username/remove -> Menghapus satu item dari keranjang
router.delete('/:username/remove', isBuyer, shoppingCartController.removeProductFromCart);

// 5. DELETE /cart/:username/clear -> Mengosongkan keranjang
router.delete('/:username/clear', isBuyer, shoppingCartController.clearCart);


module.exports = router;