// services/UserService.js
const { db } = require('../database'); 

class Userservice {

    async isBuyer(username) {
        const user = await db.User.findOne({ where: { username } });

        if (!user || user.role !== 'buyer') {
            const error = new Error("Access denied. Buyer only.");
            error.statusCode = 403;
            throw error;
        }
        return true;
    }

    async getAllUsers() {
        return await db.User.findAll();
    }

    async getUserByUsername(username) {
        return await db.User.findOne({ where: { username } });
    }

    async createUser(userData) {
        // Validasi sederhana
        if (!userData.username || !userData.name || !userData.email || !userData.role) {
            const error = new Error("Missing required fields: username, name, email, role");
            error.statusCode = 400;
            throw error;
        }

        const existing = await db.User.findOne({ where: { username: userData.username } });
        if (existing) {
            const error = new Error("Username already exists.");
            error.statusCode = 409;
            throw error;
        }

        return await db.User.create(userData);
    }

    async updateUser(username, updateData) {
        delete updateData.username; // Username tidak boleh diubah

        const user = await db.User.findOne({ where: { username } });
        if (!user) {
            const error = new Error(`User ${username} not found.`);
            error.statusCode = 404;
            throw error;
        }

        await user.update(updateData);
        return user;
    }

    async deleteUser(username) {
        const deleted = await db.User.destroy({ where: { username } });
        if (!deleted) {
            const error = new Error(`User ${username} not found.`);
            error.statusCode = 404;
            throw error;
        }
    }
}

module.exports = new Userservice();
