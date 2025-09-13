const { Router } = require("express");
const { getMyUser } = require("../../controllers/users.controller");

const usersRoutes = Router();

usersRoutes.get("/me", getMyUser);

module.exports = usersRoutes;
