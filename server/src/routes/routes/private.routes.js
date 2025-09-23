const { Router } = require("express");
const productsRoutes = require("./products.routes");

const privateRoutes = Router();

privateRoutes.use("/products", productsRoutes);

module.exports = privateRoutes;
