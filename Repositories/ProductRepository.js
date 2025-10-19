const {db} = require('../database');
const { Product } = db;

class ProductRepository {

    async getAllProducts() {
        return await Product.findAll();
    }

    async getProductByName(name) {
        return await Product.findOne({ where: { product_name: name } }); 
    }

    async createProduct(newProductData) {
        return await Product.create(newProductData);
    }

    async updateProduct(name, updatedData) {
        const product = await Product.findOne({ where: { product_name: name } });
        if (product) {
            return await product.update(updatedData);
        }
        return null;
    }

    async deleteProduct(name) {
        const result = await Product.destroy({
            where: { product_name: name }
        });
        return result > 0;
    }
}

module.exports = new ProductRepository();
