const { User } = require("../../models");

const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ where: { email } });

    return user;
  } catch (error) {
    throw new Error(error);
  }
};

const getUserById = async (id) => {
  try {
    const user = await User.findByPk(id);

    return user;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { getUserByEmail, getUserById };
