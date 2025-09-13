const { Router } = require("express");
const { logout } = require("../../controllers/auth.controller");
const usersRoutes = require("./users.routes");

const commonRoutes = Router();

// users
commonRoutes.use("/users", usersRoutes);

// logout
commonRoutes.get("/logout", logout);

module.exports = commonRoutes;
