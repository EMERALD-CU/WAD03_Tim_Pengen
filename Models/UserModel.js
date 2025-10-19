const { DataTypes } = require('sequelize');
const { sequelize } = require('../database');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      username: { type: DataTypes.STRING, allowNull: false, unique: true },
      name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      role: { type: DataTypes.STRING, defaultValue: 'customer' },
    }, {
      tableName: 'users',
      timestamps: true,
    });

return User};