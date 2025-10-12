// repositories/productRepository.js

const db = require('../Data/dummyDatabase.js');

// Fungsi ini hanya untuk mencari produk berdasarkan nama
const findByName = (productName) => {
    return db.products.find(p => p.product_name === productName);
};

// Nanti teman Anda akan melengkapi file ini dengan fungsi lain (create, update, dll)
module.exports = { 
    findByName 
};