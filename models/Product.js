const mongoose = require("mongoose");

// product modele
const Product = mongoose.model("Product", {
    product_name: { type: String, min: 1, max: 50, requiered: true },
    product_brand: { type: String, min: 1, max: 50, requiered: true },
    product_price: { type: Number, min: 1, max: 100000, required: true },
    product_quantity: { type: Number, required: true },
});

module.exports = Product;
