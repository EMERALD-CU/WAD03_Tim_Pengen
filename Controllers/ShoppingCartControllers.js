// Controllers/ShoppingCartControllers.js

// --- DUMMY DATA (HARUSNYA DIIMPOR DARI DATABASE/SHARED MODULE) ---
// Data ini disalin dari controller lain untuk simulasi.
// Dalam aplikasi nyata, Anda akan mengambil data ini dari database.
const products = [
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
    },
    {
        "product_name": "Mouse Wireless M3",
        "product_category": "Electronics",
        "price": 175000,
        "owner": "Hsn"
    }
];

const users = [
    {
        "username": "EMRLD",
        "name": "Emerald",
        "email": "emer@cakyu.com",
        "role": "buyer"
    },
    {
        "username": "Hsn",
        "name": "Husni",
        "email": "husni@cakyu.com",
        "role": "seller"
    },
    {
        "username": "tNv",
        "name": "Tita Noviana",
        "email": "tita@cakyu.com",
        "role": "seller"
    }
];


// Data keranjang belanja internal (GLOBAL SCOPE CONTROLLER)
// Struktur: { username: "buyer_username", items: [{...product, quantity}, ...], totalPrice: ... }
let shoppingCarts = [
    {
        username: "EMRLD",
        items: [
            {
                product_name: "T-Shirt Katun Biru",
                price: 95000,
                quantity: 2
            }
        ],
        totalPrice: 190000
    }
];

// --- HELPER FUNCTION ---
// Fungsi bantuan untuk menghitung total harga dalam sebuah keranjang
const _calculateTotal = (cartItems) => {
    if (!cartItems || cartItems.length === 0) {
        return 0;
    }
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
};


// --- CRUD HANDLERS SHOPPING CART ---

// 1. GET /cart/:username -> Mendapatkan isi keranjang pengguna
exports.getCartByUsername = (req, res) => {
    const { username } = req.params;
    let userCart = shoppingCarts.find(cart => cart.username === username);

    // Jika pengguna ada tapi keranjangnya belum ada, kembalikan keranjang kosong
    if (!userCart) {
        // Cek dulu apakah user-nya ada dan seorang buyer
        const user = users.find(u => u.username === username);
        if (!user || user.role !== 'buyer') {
             return res.status(404).json({ message: `Buyer with username '${username}' not found.` });
        }
        return res.status(200).json({
            username,
            items: [],
            totalPrice: 0
        });
    }

    return res.status(200).json(userCart);
};

// 2. POST /cart/:username/add -> Menambahkan produk ke keranjang
exports.addProductToCart = (req, res) => {
    const { username } = req.params;
    const { product_name, quantity } = req.body;

    // Validasi 1: Input dari body
    if (!product_name || !quantity || typeof quantity !== 'number' || quantity <= 0) {
        return res.status(400).json({ message: "Invalid input. 'product_name' (string) and 'quantity' (positive number) are required." });
    }

    // Validasi 2: Pengguna harus ada dan merupakan 'buyer'
    const user = users.find(u => u.username === username);
    if (!user || user.role !== 'buyer') {
        return res.status(403).json({ message: "Access denied. Only buyers can have a shopping cart." });
    }

    // Validasi 3: Produk harus ada di daftar produk
    const productToAdd = products.find(p => p.product_name === product_name);
    if (!productToAdd) {
        return res.status(404).json({ message: `Product "${product_name}" not found.` });
    }

    // Cari atau buat keranjang untuk pengguna
    let userCart = shoppingCarts.find(cart => cart.username === username);
    if (!userCart) {
        userCart = { username, items: [], totalPrice: 0 };
        shoppingCarts.push(userCart);
    }

    // Cek apakah produk sudah ada di keranjang
    const itemIndex = userCart.items.findIndex(item => item.product_name === product_name);

    if (itemIndex > -1) {
        // Jika sudah ada, tambahkan kuantitasnya
        userCart.items[itemIndex].quantity += quantity;
    } else {
        // Jika belum ada, tambahkan item baru
        userCart.items.push({
            product_name: productToAdd.product_name,
            price: productToAdd.price,
            quantity: quantity
        });
    }

    // Hitung ulang total harga
    userCart.totalPrice = _calculateTotal(userCart.items);

    return res.status(200).json(userCart);
};

// 3. PATCH /cart/:username/update -> Mengubah kuantitas produk
exports.updateProductQuantity = (req, res) => {
    const { username } = req.params;
    const { product_name, new_quantity } = req.body;

    if (!product_name || new_quantity === undefined || typeof new_quantity !== 'number' || new_quantity < 0) {
        return res.status(400).json({ message: "Invalid input. 'product_name' (string) and 'new_quantity' (number >= 0) are required." });
    }

    let userCart = shoppingCarts.find(cart => cart.username === username);
    if (!userCart) {
        return res.status(404).json({ message: `Shopping cart for '${username}' not found.` });
    }

    const itemIndex = userCart.items.findIndex(item => item.product_name === product_name);
    if (itemIndex === -1) {
        return res.status(404).json({ message: `Product "${product_name}" not in cart.` });
    }

    // Jika kuantitas baru adalah 0, hapus item dari keranjang
    if (new_quantity === 0) {
        userCart.items.splice(itemIndex, 1);
    } else {
        userCart.items[itemIndex].quantity = new_quantity;
    }
    
    userCart.totalPrice = _calculateTotal(userCart.items);

    return res.status(200).json(userCart);
};


// 4. DELETE /cart/:username/remove -> Menghapus satu jenis produk dari keranjang
exports.removeProductFromCart = (req, res) => {
    const { username } = req.params;
    const { product_name } = req.body;

    if (!product_name) {
         return res.status(400).json({ message: "'product_name' is required in the request body." });
    }

    let userCart = shoppingCarts.find(cart => cart.username === username);
    if (!userCart) {
        return res.status(404).json({ message: `Shopping cart for '${username}' not found.` });
    }

    const initialLength = userCart.items.length;
    userCart.items = userCart.items.filter(item => item.product_name !== product_name);

    if (userCart.items.length === initialLength) {
        return res.status(404).json({ message: `Product "${product_name}" not in cart.` });
    }

    userCart.totalPrice = _calculateTotal(userCart.items);

    return res.status(200).json(userCart);
};

// 5. DELETE /cart/:username/clear -> Mengosongkan seluruh isi keranjang
exports.clearCart = (req, res) => {
    const { username } = req.params;
    
    let userCart = shoppingCarts.find(cart => cart.username === username);
    if (!userCart) {
        return res.status(404).json({ message: `Shopping cart for '${username}' not found.` });
    }

    userCart.items = [];
    userCart.totalPrice = 0;

    // Menggunakan 204 No Content, karena tidak ada body yang perlu dikembalikan
    return res.status(204).send();
};