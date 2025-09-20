const express = require('express');
const router = express.Router();

// Ini adalah contoh data yang digunakan sebagai dummy database
const users = [
    { name: 'EMERALD ALPHANTE REIREZQI ', nim: '24120500003'},
    { name: 'HUSNI', nim: '24120500026' },
    { name: 'TITA NOVIANA', nim: '24120500011' }
];

// Endpoint GET /:user
// URL-nya akan menjadi /aboutus/:user
router.get('/:user', (req, res) => {
    const userName = req.params.user;

    // Untuk mencari pengguna berdasarkan nama yang ada di URL
    const userFound = users.find(user => user.name.replace(/\s/g, '').toLowerCase() === userName.toLowerCase());

    if (userFound) {
        // Jika data ditemukan maka akan ditampikan nama dan nim
        res.status(200).json({
            name: userFound.name,
            nim: userFound.nim
        });
    } else {
        // Pesan Jika data tidak ditemukan
        res.status(404).json({ message: 'User Tidak Ditemukan Silahkan Masukkan data yang sesuai' });
    }
});

// digunakan untuk mengekspor router
module.exports = router;