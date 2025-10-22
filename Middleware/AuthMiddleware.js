const sequelize = require('../database').sequelize;
const userRepository = require('../Repositories/UserRepository');

const isSeller = (req, res, next) => {
    
    const { username } = req.body;
    // const user = dummyDatabase.users.find(u => u.username === username);

    const user = userRepository.findByUsername(username);

    if (!user || user.role !== 'seller') {
        return res.status(403).json({ message: 'Akses ditolak. Anda bukan seller.' });
    }

    next();
};

module.exports = {
    isSeller,
};