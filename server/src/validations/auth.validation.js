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
    return res.status(422).json({
      about: "sign up",
      message: "Please provide all required fields, except code",
    });
  }

  // name validation
  const nameValidationResult = nameValidation(firstName, lastName);
  if (!nameValidationResult.ok)
    return next(new ServerError(nameValidationResult.message, "sign up", 422));

  // email validation
  const emailValidationResult = emailValidation(email);
  if (!emailValidationResult.ok)
    return next(new ServerError(emailValidationResult.message, "sign up", 422));

  // password validation
  const passwordValidationResult = passwordValidation(password);
  if (!passwordValidationResult.ok)
    return next(
      new ServerError(passwordValidationResult.message, "sign up", 422)
    );

  return next();
};

const loginValidation = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({
      about: "log in",
      message: "Please provide all required fields",
    });
  }

  // email validation
  const emailValidationResult = emailValidation(email);
  if (!emailValidationResult.ok)
    return next(new ServerError(emailValidationResult.message, "log in", 422));

  // password validation
  const passwordValidationResult = passwordValidation(password);
  if (!passwordValidationResult.ok)
    return next(
      new ServerError(passwordValidationResult.message, "log in", 422)
    );

  return next();
};

module.exports = {
  signupValidation,
  loginValidation,
};
