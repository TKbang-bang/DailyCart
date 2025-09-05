const ServerError = require("../Errors/errorClas");
const { createManagerOrAdmin } = require("../services/auth.service");
const { sendingCookieToken } = require("../services/cookies.service");
const { getUserByEmail, getUserById } = require("../services/users.service");
const { createAccessToken, createRefreshToken } = require("../utils/token");

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

const isUserLogged = async (req, res, next) => {
  try {
    // geting the user by id
    const user = await getUserById(req.userId);
    if (!user) return next(new ServerError("User not found", "user", 404));

    return res.status(200).json({ message: "You are logged" });
  } catch (error) {
    return next(new ServerError("Internal server error", "server", 500));
  }
};

module.exports = {
  privateSignup,
  isUserLogged,
};
