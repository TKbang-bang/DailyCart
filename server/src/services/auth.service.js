const { User } = require("../../models");

const createManagerOrAdmin = async (
  firstName,
  lastName,
  email,
  password,
  code
) => {
  const admin = code == process.env.ADMIN_CODE;
  try {
    const { dataValues: user } = await User.create({
      firstname: firstName,
      lastname: lastName,
      email,
      password,
      role: admin ? "admin" : "manager",
    });

    return user;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  createManagerOrAdmin,
};
