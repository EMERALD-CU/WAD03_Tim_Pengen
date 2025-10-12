// Tugasnya: Hanya menjadi perantara antara request/response dan service.
const cartService = require('../Services/ShoppingCartService.js'); // Pastikan path dan nama file ini benar

// --- CRUD HANDLERS SHOPPING CART (VERSI BARU) ---

// 1. GET /cart/:username -> Mendapatkan isi keranjang pengguna
exports.getCartByUsername = (req, res) => {
    try {
        const { username } = req.params;
        // TIDAK ADA LAGI LOGIKA DI SINI. HANYA MENYURUH SERVICE.
        const userCart = cartService.getCart(username);
        res.status(200).json(userCart);
    } catch (error) {
        // Jika service gagal (misal: user tidak ditemukan), kita tangkap errornya
        res.status(404).json({ message: error.message });
    }
};

// 2. POST /cart/:username/add -> Menambahkan produk ke keranjang
exports.addProductToCart = (req, res) => {
    try {
        const { username } = req.params;
        const { product_name, quantity } = req.body;
        // Suruh service untuk menambahkan item
        const updatedCart = cartService.addItem(username, product_name, quantity);
        res.status(200).json(updatedCart);
    } catch (error) {
        // Tangani berbagai kemungkinan error dari service
        if (error.message.includes("not found")) {
            return res.status(404).json({ message: error.message });
        }
        if (error.message.includes("Access denied")) {
            return res.status(403).json({ message: error.message });
        }
        // Untuk error "Invalid input"
        return res.status(400).json({ message: error.message });
    }
};

// 3. PATCH /cart/:username/update -> Mengubah kuantitas produk
exports.updateProductQuantity = (req, res) => {
    try {
        const { username } = req.params;
        const { product_name, new_quantity } = req.body;
        const updatedCart = cartService.updateItemQuantity(username, product_name, new_quantity);
        res.status(200).json(updatedCart);
    } catch (error) {
        if (error.message.includes("not found") || error.message.includes("not in cart")) {
            return res.status(404).json({ message: error.message });
        }
        return res.status(400).json({ message: error.message });
    }
};


// 4. DELETE /cart/:username/remove -> Menghapus satu jenis produk dari keranjang
exports.removeProductFromCart = (req, res) => {
    try {
        const { username } = req.params;
        const { product_name } = req.body;
        const updatedCart = cartService.removeItem(username, product_name);
        res.status(200).json(updatedCart);
    } catch (error) {
        if (error.message.includes("not found") || error.message.includes("not in cart")) {
            return res.status(404).json({ message: error.message });
        }
        return res.status(400).json({ message: error.message });
    }
};

// 5. DELETE /cart/:username/clear -> Mengosongkan seluruh isi keranjang
exports.clearCart = (req, res) => {
    try {
        const { username } = req.params;
        cartService.clearAllItems(username);
        res.status(204).send();
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
};