// package import
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// package initialization
const app = express();
app.use(cors());

// dotenv config
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const productRoutes = require("./routes/product");
app.use(productRoutes);

app.get("/", (req, res) => {
    res.json("Welcome on Biforst product API");
});

app.all("*", (req, res) => {
    res.status(404).json({
        error: "This root doesnt exist",
    });
});

server = app.listen(process.env.PORT, () => {
    console.log("Server started");
});
