const { Router } = require("../controllers/user/userModule");
const router = new Router();
const { get, create, login } = require("../controllers/user/userController");
const { check } = require("express-validator");
const passport = require("passport");

// Get all users
router.get("/users", get.getUsers);

// User Sign Up
router.post(
  "/user/signup",
  [
    check("firstName", "First name must be valid").not().isEmpty().isString().isLength({ min: 2 }),
    check("lastName", "Last name must be valid").not().isEmpty().isString().isLength({ min: 2 }),
    check("email", "Email must have a valid format").not().isEmpty().isEmail(),
    check("password", "Password must be valid").not().isEmpty().isString(),
    check("country", "Country must be valid").not().isEmpty().isString().isLength({ min: 2 }),
  ],
  create.create
);

// User Sign In
router.post("/user/signin", login.login);
router.get("/user/signinls", passport.authenticate("jwt", { session: false }), login.loginLocalStorage);

module.exports = router;
