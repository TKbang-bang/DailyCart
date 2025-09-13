const { Router } = require("express");
const { privateSignup, login } = require("../../controllers/auth.controller");
const {
  signupValidation,
  loginValidation,
} = require("../../validations/auth.validation");
const authRouter = Router();

// private
authRouter.post("/private/signup", signupValidation, privateSignup);

// common
authRouter.post("/common/login", loginValidation, login);

module.exports = authRouter;
