// models/cartItemModel.js
module.exports = (sequelize, DataTypes) => {
    const CartItem = sequelize.define('CartItem', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
        // Kolom 'userId' dan 'productId' akan dibuat otomatis oleh relasi
    }, { tableName: 'cart_items', timestamps: true });
    return CartItem;
};