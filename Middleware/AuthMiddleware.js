const sequelize = require('../database').sequelize;

const isSeller = (req, res, next) => {
    
    const { username } = req.body;
    const user = dummyDatabase.users.find(u => u.username === username);

    if (!user || user.role !== 'seller') {
        return res.status(403).json({ message: 'Akses ditolak. Anda bukan seller.' });
    }

    next();
};

module.exports = {
    isSeller,
};