const { check } = require("express-validator");

const cityValidation = [
  check("name", "City name must be valid").not().isEmpty().isString().isLength({ min: 3 }),
  check("country", "Country must be valid").not().isEmpty().isString().isLength({ min: 3 }),
  check("img", "Email must have a valid format").not().isEmpty(),
];

module.exports = { cityValidation };
