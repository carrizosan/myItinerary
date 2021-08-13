const { check } = require("express-validator");

const itineraryValidation = [
  check("title", "Title must be valid").not().isEmpty().isString().isLength({ min: 3 }),
  check("img", "Image name must be valid").not().isEmpty().isString(),
  check("authorName", "Author name must be valid").not().isEmpty().isString(),
  check("price", "Price must be valid").not().isEmpty().isNumeric({ min: 1, max: 5 }),
  check("duration", "Duration must be valid").not().isEmpty().isNumeric({ min: 1 }),
  check("cityId", "City id must be valid").not().isEmpty().isMongoId(),
];

module.exports = { itineraryValidation };
