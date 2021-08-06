const { Router } = require("../controllers/city/cityModule");
const router = new Router();
const { get, create } = require("../controllers/city/cityController");

router.get("/", get.getCities);
// router.get("/city/:name", get.getCityByQuery);

router.post("/", create.create);

module.exports = router;
