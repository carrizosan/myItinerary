const { Router } = require("../controllers/user/userModule");
const router = new Router();
const { get, create } = require("../controllers/user/userController");

router.get("/", get.getUsers);

router.post("/", create.create);

module.exports = router;
