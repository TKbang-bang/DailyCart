const ServerError = require("../Errors/errorClas");
const { getUserById } = require("../services/users.service");

const getMyUser = async (req, res, next) => {
  try {
    const user = await getUserById(req.userId);
    if (!user) return next(new ServerError("User not found", "user", 404));

    return res.status(200).json({ user });
  } catch (error) {
    console.log({ error });
    return next(new ServerError("Internal server error", "server", 500));
  }
};

module.exports = { getMyUser };
