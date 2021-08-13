const { Router } = require("../controllers/user/userModule");
const router = new Router();
const passport = require("passport");
const { get, create, login } = require("../controllers/user/userController");
const { signUpValidation } = require("../validations/signup");

// Get
router.get("/users", get.getUsers);

// User Sign Up
router.post("/user/signup", signUpValidation, create.create);

// User Sign In
router.post("/user/signin", login.login);
router.get("/user/signinls", passport.authenticate("jwt", { session: false }), login.loginLocalStorage);

module.exports = router;
