// Tugasnya: menemukan, membuat, dan menyimpan data keranjang.
const db = require('../Data/dummyDatabase.js');

const findByUsername = (username) => {
    return db.shoppingCartRepository.find(cart => cart.username === username);
};

const create = (username) => {
    const newCart = { username, items: [], totalPrice: 0 };
    db.shoppingCartRepository.push(newCart);
    return newCart;
};

const save = (updatedCart) => {
    const index = db.shoppingCartRepositoriy.findIndex(cart => cart.username === updatedCart.username);
    if (index !== -1) {
        db.shoppingCartRepositories[index] = updatedCart;
    }
    return updatedCart;
};

module.exports = {
    findByUsername,
    create,
    save
};