const { Router } = require("express");
const express = require("express");

const router = express.Router();

router.get("/test", (req, res) => {
  res.send({ msg: "Cities testing route" });
});

module.exports = router;
