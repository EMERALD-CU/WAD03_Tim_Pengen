// models/productModel.js
module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        product_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        product_category: {
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.DECIMAL(12, 2), // Tipe data terbaik untuk uang
            allowNull: false
        }
        // Kolom 'sellerId' akan dibuat otomatis oleh relasi
    }, { tableName: 'products', timestamps: true });
    return Product;
};