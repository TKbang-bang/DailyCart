const { Router } = require("express");
const { privateSignup } = require("../../controllers/auth.controller");
const { signupValidation } = require("../../validations/auth.validation");
const authRouter = Router();

// private
authRouter.post("/private/signup", signupValidation, privateSignup);

module.exports = authRouter;
