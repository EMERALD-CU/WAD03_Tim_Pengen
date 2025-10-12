// File ini adalah satu-satunya sumber kebenaran (Single Source of Truth) untuk data kita.

const users = [
    { "username": "EMRLD", "name": "Emerald", "email": "emer@cakyu.com", "role": "buyer" },
    { "username": "Hsn", "name": "Husni", "email": "husni@cakyu.com", "role": "seller" },
    { "username": "tNv", "name": "Tita Noviana", "email": "tita@cakyu.com", "role": "seller" }
];

const products = [
    { "product_name": "Laptop Gaming A200", "product_category": "Electronics", "price": 15000000, "owner": "Hsn" },
    { "product_name": "T-Shirt Katun Biru", "product_category": "Fashion", "price": 95000, "owner": "tNv" },
    { "product_name": "Mouse Wireless M3", "product_category": "Electronics", "price": 175000, "owner": "Hsn" }
];

const shoppingCarts = [
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

module.exports = {
    users,
    products,
    shoppingCarts
};