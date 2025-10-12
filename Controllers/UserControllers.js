// Controllers/UserControllers.js - Menggunakan Internal Dummy Data


exports.isBuyer = (req, res, next) => {
    // Ambil username dari parameter URL, karena semua rute cart akan seperti '/:username/...'
    const { username } = req.params; 
    
    // Cari user di data kita
    const user = users.find(u => u.username === username); 

    // Cek apakah pengguna ada DAN perannya adalah 'buyer'
    if (!user || user.role !== 'buyer') {
        // 403 Forbidden: Akses ditolak
        return res.status(403).json({ message: "Access denied. Only the buyer who owns this cart can perform this action." });
    }
    
    next(); // Jika lolos, lanjutkan ke fungsi controller berikutnya
};

// Menggunakan let untuk array data utama (GLOBAL SCOPE CONTROLLER)
let users = [
    {
        "username": "EMRLD",
        "name": "Emerald",
        "email": "emer@cakyu.com",
        "role": "buyer"
    },
    {
        "username": "Hsn",
        "name": "Husni",
        "email": "husni@cakyu.com",
        "role": "seller"
    },
    {
        "username": "tNv",
        "name": "Tita Noviana",
        "email": "tita@cakyu.com",
        "role": "seller"
    }
];

// 1. GET /
exports.getUsers = (req, res) => {
    // Mengembalikan seluruh array pengguna
    return res.status(200).json(users);
};

// 2. GET /:username
exports.getUserByUsername = (req, res) => {
    const { username } = req.params;
    const user = users.find(u => u.username === username);

    if (!user) {
        // Menggunakan 404 Not Found (lebih tepat)
        return res.status(404).json({ message: `User with username ${username} not found.` });
    }
    return res.status(200).json(user);
};

// 3. POST /
exports.createUser = (req, res) => {
    const newUser = req.body;

    // Tambahkan pengaman (walaupun error utama sudah hilang)
    if (!newUser || !newUser.username) {
        return res.status(400).json({ message: 'Request body is malformed or missing username.' });
    }
    
    // Validasi: memastikan username unik
    if (users.some(u => u.username === newUser.username)) {
        return res.status(409).json({ message: 'Username already exists.' }); 
    }

    // Validasi properti wajib
    if (!newUser.name || !newUser.email || !newUser.role) {
        return res.status(400).json({ message: 'Missing required properties: name, email, or role.' }); 
    }

    users.push(newUser); 
    return res.status(201).json(newUser); // 201 Created
};


// 4. PATCH /:username
exports.updateUser = (req, res) => {
    let { username } = req.params;
    let updatedData = req.body;
    
    const userIndex = users.findIndex(u => u.username === username);

    if (userIndex === -1) {
        return res.status(404).json({ message: `User with username ${username} not found.` });
    }

    delete updatedData.username; 
    
    // Gabungkan data lama dengan data baru
    users[userIndex] = { ...users[userIndex], ...updatedData };
    
    return res.status(200).json(users[userIndex]);
};

// 5. DELETE /:username
exports.deleteUser = (req, res) => {
    const { username } = req.params;
    const initialLength = users.length;
    
    users = users.filter(u => u.username !== username);

    if (users.length === initialLength) {
        return res.status(404).json({ message: `User with username ${username} not found.` });
    }

    return res.status(204).send(); // 204 No Content
};