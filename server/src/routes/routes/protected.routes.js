const { Router } = require("express");
const privateRoutes = require("./private.routes");
const commonRoutes = require("./common.routes");

const protectedRoutes = Router();

// privates routes
protectedRoutes.use("/private", privateRoutes);

// common routes
protectedRoutes.use("/common", commonRoutes);

module.exports = protectedRoutes;
