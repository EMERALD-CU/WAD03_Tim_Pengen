const productService = require('../Services/ProductService');

const productController = {
    getAllProducts: async (req, res) => {
        try {
            const products = await productService.getAllProducts();
            res.json(products);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getProductByName: async (req, res) => {
        try {
            const { name } = req.params;
            const product = await productService.getProductByName(name);
            if (product) {
                res.json(product);
            } else {
                res.status(404).json({ message: "Product not found" });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    createProduct: async (req, res) => {
        try {
            const newProductData = req.body;
            if (!newProductData.product_name || !newProductData.price || !newProductData.stock) {
                return res.status(400).json({ message: "Product name, price, and stock are required." });
            }
            const newProduct = await productService.createProduct(newProductData);
            res.status(201).json(newProduct);
        } catch (error) {
            if (error.message === "Product name already exists.") {
                return res.status(409).json({ message: error.message });
            }
            res.status(500).json({ message: error.message });
        }
    },

    updateProduct: async (req, res) => {
        try {
            const { name } = req.params;
            const updatedData = req.body;
            const updatedProduct = await productService.updateProduct(name, updatedData);
            if (updatedProduct) {
                res.json(updatedProduct);
            } else {
                res.status(404).json({ message: "Product not found" });
            }
        } catch (error) {
            if (error.message === "New product name already exists.") {
                return res.status(409).json({ message: error.message });
            }
            res.status(500).json({ message: error.message });
        }
    },

    deleteProduct: async (req, res) => {
        try {
            const { name } = req.params;
            const isDeleted = await productService.deleteProduct(name);
            if (isDeleted) {
                res.status(204).send();
            } else {
                res.status(404).json({ message: "Product not found" });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = productController;