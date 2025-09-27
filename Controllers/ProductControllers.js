// Controllers/ProductControllers.js

// Data produk internal (GLOBAL SCOPE CONTROLLER)
let products = [
    {
        "product_name": "Laptop Gaming A200",
        "product_category": "Electronics",
        "price": 15000000,
        "owner": "Hsn"
    },
    {
        "product_name": "T-Shirt Katun Biru",
        "product_category": "Fashion",
        "price": 95000,
        "owner": "tNv"
    }
];

// --- CRUD HANDLERS PRODUCTS ---

// 1. GET /products/
exports.getProducts = (req, res) => {
    return res.status(200).json(products); 
};

// 2. GET /products/:product_name
exports.getProductByName = (req, res) => {
    const { product_name } = req.params; 
    const product = products.find(p => p.product_name === product_name); 

    if (!product) {
        return res.status(404).json({ message: `Product "${product_name}" not found.` });
    }
    return res.status(200).json(product);
};

// 3. POST /products/
exports.createProduct = (req, res) => {
    const newProduct = req.body; 

    if (products.some(p => p.product_name === newProduct.product_name)) {
        return res.status(409).json({ message: "Product name already exists." });
    }
    if (!newProduct.product_name || !newProduct.product_category || !newProduct.price || !newProduct.owner) {
        return res.status(400).json({ message: "Missing required properties." });
    }

    products.push(newProduct);
    return res.status(201).json(newProduct); 
};

// 4. PATCH/PUT /products/:product_name
exports.updateProduct = (req, res) => {
    const { product_name } = req.params;
    let updatedData = req.body;
    
    const productIndex = products.findIndex(p => p.product_name === product_name);

    if (productIndex === -1) {
        return res.status(404).json({ message: `Product "${product_name}" not found.` });
    }
    
    if (updatedData.product_name && updatedData.product_name !== product_name) {
        if (products.some((p, index) => index !== productIndex && p.product_name === updatedData.product_name)) {
            return res.status(409).json({ message: "New product name already exists." });
        }
    }

    delete updatedData.owner;
    
    products[productIndex] = { ...products[productIndex], ...updatedData };
    
    return res.status(200).json(products[productIndex]);
};

// 5. DELETE /products/:product_name
exports.deleteProduct = (req, res) => {
    const { product_name } = req.params;
    const initialLength = products.length;
    
    products = products.filter(p => p.product_name !== product_name);

    if (products.length === initialLength) {
        return res.status(404).json({ message: `Product "${product_name}" not found.` });
    }

    return res.status(204).send();
};