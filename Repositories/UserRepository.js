const {db} = require('../database');
// const { User } = db.User;

class UserRepository {

    async findByUsername(username) {
        return await db.User.findOne({
            where: {
                username: username
            }
        });
    }

    async getAllUsers() {
        return await User.findAll();
    }

    async createUser(userData) {
        return await User.create(userData);
    }
}

module.exports = new UserRepository();
