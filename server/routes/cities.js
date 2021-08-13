const { Router } = require("../controllers/city/cityModule");
const router = new Router();
const { get, create } = require("../controllers/city/cityController");
const passport = require("passport");

// Get
router.get("/cities", get.getCities);
router.get("/city/:id", get.getCityById);

// Create
router.post("/cities", passport.authenticate("jwt", { session: false }), create.create);

module.exports = router;
