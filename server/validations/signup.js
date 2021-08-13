const { check } = require("express-validator");

const signUpValidation = [
  check("firstName", "First name must be valid").not().isEmpty().isString().isLength({ min: 2 }),
  check("lastName", "Last name must be valid").not().isEmpty().isString().isLength({ min: 2 }),
  check("email", "Email must have a valid format").not().isEmpty().isEmail(),
  check("password", "Password must be valid").not().isEmpty().isString(),
  check("country", "Country must be valid").not().isEmpty().isString().isLength({ min: 2 }),
];

module.exports = { signUpValidation };
