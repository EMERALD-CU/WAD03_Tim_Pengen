
    const dummyDatabase = require('../Data/dummyDatabase');

    class ProductRepository {
        constructor() {
            this.products = dummyDatabase.products;
        }

        async getAllProducts() {
            return this.products;
        }

        async getProductByName(name) {
            return this.products.find(product => product.product_name === name);
        }

        async createProduct(newProductData) {
            this.products.push(newProductData);
            return newProductData;
        }

        async updateProduct(name, updatedData) {
            const index = this.products.findIndex(product => product.product_name === name);
            if (index > -1) {
                this.products[index] = { ...this.products[index], ...updatedData };
                return this.products[index];
            }
            return null;
        }

        async deleteProduct(name) {
            const initialLength = this.products.length;
            this.products = this.products.filter(product => product.product_name !== name);
            return this.products.length < initialLength;
        }
    }
    
    module.exports = new ProductRepository();