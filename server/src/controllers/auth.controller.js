const ServerError = require("../Errors/errorClas");
const { createManagerOrAdmin } = require("../services/auth.service");
const { sendingCookieToken } = require("../services/cookies.service");
const { getUserByEmail, getUserById } = require("../services/users.service");
const { createAccessToken, createRefreshToken } = require("../utils/token");
const bcrypt = require("bcrypt");

const privateSignup = async (req, res, next) => {
  try {
    // credentials from client
    const { firstName, lastName, email, password, code } = req.body;

    // check if the email is already in use
    const user = await getUserByEmail(email);
    if (user)
      return next(new ServerError("Email already in use", "email", 409));

    // creating the user
    const userCreate = await createManagerOrAdmin(
      firstName,
      lastName,
      email,
      password,
      code
    );

    // creting the tokens
    const accessToken = createAccessToken(userCreate.id);
    const refreshToken = createRefreshToken(userCreate.id);

    // sending the cookie and token
    return sendingCookieToken(res, accessToken, refreshToken);
  } catch (error) {
    return next(new ServerError("Internal server error", "server", 500));
  }
};

const login = async (req, res, next) => {
  try {
    // credentials from client
    const { email, password } = req.body;

    // check if the email is already in use
    const user = await getUserByEmail(email);
    if (!user) return next(new ServerError("User not found", "email", 404));

    // check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return next(new ServerError("Incorrect password", "password", 400));

    // creting the tokens
    const accessToken = createAccessToken(user.id);
    const refreshToken = createRefreshToken(user.id);

    // sending the cookie and token
    return sendingCookieToken(res, accessToken, refreshToken);
  } catch (error) {
    return next(new ServerError("Internal server error", "server", 500));
  }
};

const logout = async (req, res, next) => {
  try {
    // deleting the user id
    req.userId = null;

    // clearing the cookie
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    });

    res.status(204).end();
  } catch (error) {
    return next(new ServerError("Internal server error", "server", 500));
  }
};

module.exports = {
  privateSignup,
  login,
  logout,
};
