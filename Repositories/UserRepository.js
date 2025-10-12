// repositories/userRepository.js

const db = require('../Data/dummyDatabase.js');

// Fungsi ini hanya untuk mencari user berdasarkan username
const findByUsername = (username) => {
    return db.users.find(u => u.username === username);
};

// Nanti teman Anda akan melengkapi file ini dengan fungsi lain (create, update, dll)
module.exports = { 
    findByUsername 
};