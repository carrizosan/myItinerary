const express = require("express");
const router = express.Router();
const City = require("../models/city");

router.get("/", (req, res) => {
  City.find({})
    .then((data) => res.send(data))
    .catch((err) => console.log(err));
});

router.post("/", (req, res) => {
  const newCity = new City({
    name: req.body.name,
    country: req.body.country,
    img: req.body.img,
  });

  newCity
    .save()
    .then((city) => res.send(city))
    .catch(() => res.status(500).send("Error en el servidor"));
});

module.exports = router;
