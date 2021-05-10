// import express package + router dependance initalization
const express = require("express");
const router = express.Router();

// product modele import
const Product = require("../models/Product");

// product list
router.get("/product", async (req, res) => {
    try {
        // find in DB
        const product = await Product.find({});
        res.json(product);
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ message: error.message });
    }
});

// create a product
router.get("/product/create", async (req, res) => {
    try {
        // destructuring
        const { name, brand, price, quantity } = req.query;

        // checking before acces to DB
        if (name && brand && price && quantity) {
            // create a new product in DB
            const product = new Product({
                product_name: name,
                product_brand: brand,
                product_price: price,
                product_quantity: quantity,
            });

            // save in DB
            await product.save();

            res.json(product);
        } else {
            res.status(400).json({ message: "all fileds are required" });
        }
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ message: error.message });
    }
});

// update a product
router.get("/product/update/:id", async (req, res) => {
    try {
        // check in DB if the product exists
        const productToModify = await Product.findById(req.params.id);

        //  destructuring
        const { name, brand, price, quantity } = req.query;

        if (productToModify) {
            if (name) {
                productToModify.product_name = name;
            }
            if (brand) {
                productToModify.product_brand = brand;
            }
            if (price) {
                productToModify.product_price = price;
            }
            if (quantity) {
                productToModify.product_quantity = quantity;
            }

            await productToModify.save();

            res.status(200).json("Product modified succesfully !");
        } else {
            res.status(400).json({ message: "Product does not exists" });
        }
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ message: error.message });
    }
});

// delete the product
router.get("/product/del/:id", async (req, res) => {
    try {
        // looking in DB if the product exists
        productToDelete = await Product.findById(req.params.id);

        await productToDelete.delete();

        res.status(200).json("Product deleted succesfully !");
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
