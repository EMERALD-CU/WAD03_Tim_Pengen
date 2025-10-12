const productRepository = require('../Repositories/ProductRepository');

class ProductService {
    async getAllProducts() {
        return await productRepository.getAllProducts();
    }

    async getProductByName(name) {
        return await productRepository.getProductByName(name);
    }

    async createProduct(newProductData) {
        const existingProduct = await productRepository.getProductByName(newProductData.product_name);
        if (existingProduct) {
            throw new Error("Product name already exists.");
        }
        return await productRepository.createProduct(newProductData);
    }

    async updateProduct(name, updatedData) {
        if (updatedData.product_name && updatedData.product_name !== name) {
            const existingProductWithNewName = await productRepository.getProductByName(updatedData.product_name);
            if (existingProductWithNewName) {
                throw new Error("New product name already exists.");
            }
        }
        return await productRepository.updateProduct(name, updatedData);
    }

    async deleteProduct(name) {
        return await productRepository.deleteProduct(name);
    }
}

module.exports = new ProductService();
