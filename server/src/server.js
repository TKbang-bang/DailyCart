require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./routes/router");
const errorHandler = require("./Errors/errorHandler");
const cookieParser = require("cookie-parser");

// creating express app
const app = express();

// setters
app.set("port", process.env.PORT);

// middlewares
app.use(express.json());
app.use(
  cors({
    origin: [`${process.env.CLIENT_URL}`, `${process.env.PRIVATE_URL}`],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    exposedHeaders: ["access-token"],
  })
);
app.use(cookieParser());

// routes
app.use(router);

// error handler
app.use(errorHandler);

// starting server
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
