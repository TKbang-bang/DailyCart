const cookiesOption = {
  httpOnly: true,
  secure: false,
  sameSite: "lax",
  maxAge: 1000 * 60 * 60 * 24 * 30,
};

module.exports = cookiesOption;
