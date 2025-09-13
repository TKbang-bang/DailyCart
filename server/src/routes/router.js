const { Router } = require("express");
const authRouter = require("./routes/auth.routes");
const sessionMiddleware = require("../middlewares/session");
const protectedRoutes = require("./routes/protected.routes");

const router = Router();

// auth routes
router.use("/auth", authRouter);

// protected routes
router.use("/protected", sessionMiddleware, protectedRoutes);

module.exports = router;
