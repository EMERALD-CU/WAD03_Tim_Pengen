// Tugasnya: Menjalankan semua aturan bisnis dan validasi.
const cartRepo = require('../Repositories/ShoppingCartRepository');
const userRepo = require('../Repositories/UserRepository'); // Pastikan file ini ada
const productRepo = require('../Repositories/ProductRepository'); // Pastikan file ini ada

const _calculateTotal = (cartItems) => {
    if (!cartItems || cartItems.length === 0) return 0;
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
};

const getCart = (username) => {
    const user = userRepo.findByUsername(username);
    if (!user || user.role !== 'buyer') {
        throw new Error(`Buyer with username '${username}' not found.`);
    }
    let userCart = cartRepo.findByUsername(username);
    if (!userCart) {
        return { username, items: [], totalPrice: 0 };
    }
    return userCart;
};

const addItem = (username, productName, quantity) => {
    if (!productName || !quantity || typeof quantity !== 'number' || quantity <= 0) {
        throw new Error("Invalid input. 'product_name' and positive 'quantity' are required.");
    }
    const user = userRepo.findByUsername(username);
    if (!user || user.role !== 'buyer') {
        throw new Error("Access denied. Only buyers can add to a cart.");
    }
    const productToAdd = productRepo.findByName(productName);
    if (!productToAdd) {
        throw new Error(`Product "${productName}" not found.`);
    }
    let userCart = cartRepo.findByUsername(username);
    if (!userCart) {
        userCart = cartRepo.create(username);
    }
    const itemIndex = userCart.items.findIndex(item => item.product_name === productName);
    if (itemIndex > -1) {
        userCart.items[itemIndex].quantity += quantity;
    } else {
        userCart.items.push({
            product_name: productToAdd.product_name,
            price: productToAdd.price,
            quantity: quantity
        });
    }
    userCart.totalPrice = _calculateTotal(userCart.items);
    return cartRepo.save(userCart);
};

// ... Tambahkan fungsi lain (updateItemQuantity, removeItem, clearAllItems) dari contoh sebelumnya ke sini ...
// (Saya singkat agar tidak terlalu panjang, tapi pastikan semua fungsi service ada di file ini)

module.exports = {
    getCart,
    addItem,
    // updateItemQuantity,
    // removeItem,
    // clearAllItems
};