// routes/UserManagementRoutes.js
const express = require('express');
const router = express.Router();

// Import Controller
// PASTIKAN path ini benar: sesuaikan dengan struktur folder Anda!
const userController = require('../Controllers/UserControllers'); 

// --- User Management Endpoints (CRUD) ---

// 1. GET /
// Endpoint: GET /users/
router.get('/', userController.getUsers); 
     
// 2. GET /:username
// Endpoint: GET /users/:username
router.get('/:username', userController.getUserByUsername); 

// 3. POST /
// Endpoint: POST /users/
router.post('/', userController.createUser); 
     
// 4. PATCH /:username (Update Sebagian - Metode yang Disarankan)
// Endpoint: PATCH /users/:username
router.patch('/:username', userController.updateUser);

// [PENYESUAIAN TAMBAHAN UNTUK MENGHINDARI ERROR "Cannot PUT"]
// 4b. PUT /:username (Update Penuh - Menunjuk ke handler yang sama)
// Endpoint: PUT /users/:username
router.put('/:username', userController.updateUser); 


// 5. DELETE /:username
// Endpoint: DELETE /users/:username
router.delete('/:username', userController.deleteUser); 


module.exports = router;