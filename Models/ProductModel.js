const { DataTypes } = require('sequelize');
const { sequelize } = require('../database');

module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      product_name: { type: DataTypes.STRING, allowNull: false },
      product_category: { type: DataTypes.TEXT },
      price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },

    }, {
      tableName: 'products',
      timestamps: true,
    });

return Product};
