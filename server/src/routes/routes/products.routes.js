const { Router } = require("express");
const { createProducts } = require("../../controllers/products.controller");
const upload = require("../../utils/multer");

const productsRoutes = Router();

productsRoutes.post("/", upload.single("image"), createProducts);

module.exports = productsRoutes;
