const { Router } = require("../controllers/user/userModule");
const router = new Router();
const { get, create, login } = require("../controllers/user/userController");
const { check } = require("express-validator");

router.get("/users", get.getUsers);

router.post(
  "/register",
  [
    check("firstName", "First name must be valid").not().isEmpty().isString().isLength({ min: 2 }),
    check("lastName", "Last name must be valid").not().isEmpty().isString().isLength({ min: 2 }),
    check("mail", "Email must have a valid format").not().isEmpty().isEmail(),
    check("password", "Password must be valid").not().isEmpty().isString(),
    check("country", "Country must be valid").not().isEmpty().isString().isLength({ min: 2 }),
  ],
  create.create
);

router.post("/user/signin", login.login);

module.exports = router;
