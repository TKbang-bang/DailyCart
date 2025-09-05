const ServerError = require("../Errors/errorClas");

const emailValidation = (email) => {
  if (!email.includes("@")) return { ok: false, message: "Invalid email" };

  return { ok: true };
};

const passwordValidation = (password) => {
  if (password.length < 6 || password.length > 12)
    return {
      ok: false,
      message: "Password must be between 6 and 12 characters long",
    };

  return { ok: true };
};

const nameValidation = (firstName, lastName) => {
  // taking off spaces at the beginning and the end
  firstName = firstName.trim();
  lastName = lastName.trim();

  if (firstName.length < 2 || firstName.length > 20)
    return {
      ok: false,
      message: "First name must be between 2 and 20 characters long",
    };

  if (lastName.length < 2 || lastName.length > 20)
    return {
      ok: false,
      message: "Last name must be between 2 and 20 characters long",
    };

  // accept letters, numbers, spaces and underscore
  const regex = /^[a-zA-Z0-9_ ]+$/;
  if (!regex.test(firstName) || !regex.test(lastName))
    return {
      ok: false,
      message:
        "First name and last name can only contain letters, numbers, spaces and underscore",
    };

  return { ok: true };
};
const signupValidation = (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({
      about: "signup",
      message: "Please provide all required fields, except code",
    });
  }

  // name validation
  const nameValidationResult = nameValidation(firstName, lastName);
  if (!nameValidationResult.ok)
    return next(new ServerError(nameValidationResult.message, "signup", 400));

  // email validation
  const emailValidationResult = emailValidation(email);
  if (!emailValidationResult.ok)
    return next(new ServerError(emailValidationResult.message, "signup", 400));

  // password validation
  const passwordValidationResult = passwordValidation(password);
  if (!passwordValidationResult.ok)
    return next(
      new ServerError(passwordValidationResult.message, "signup", 400)
    );

  return next();
};

module.exports = {
  signupValidation,
};
