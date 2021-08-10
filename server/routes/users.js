const { Router } = require("../controllers/user/userModule");
const router = new Router();
const { get, create } = require("../controllers/user/userController");

router.get("/users", get.getUsers);

router.post("/users", create.create);

module.exports = router;
