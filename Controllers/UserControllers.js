// controllers/UserControllers.js
const userService = require('../Services/Userservice');

exports.isBuyer = async (req, res, next) => {
    try {
        const { username } = req.params;
        await userService.isBuyer(username);
        next();
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
};

exports.getUsers = async (req, res) => {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
};

exports.getUserByUsername = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await userService.getUserByUsername(username);

        if (!user) {
            return res.status(404).json({ message: `User ${username} not found.` });
        }
        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createUser = async (req, res) => {
    try {
        const result = await userService.createUser(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { username } = req.params;
        const updated = await userService.updateUser(username, req.body);
        res.status(200).json(updated);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { username } = req.params;
        await userService.deleteUser(username);
        res.status(204).send();
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
};
