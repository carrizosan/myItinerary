const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("./passport");

const { mongoURI: db } = require("./config/keys");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(passport.initialize());

// Express Routes
app.use("/api", require("./routes/cities"));
app.use("/api", require("./routes/users"));
app.use("/api", require("./routes/itineraries"));

// Mongo DB Connection
mongoose
  .connect(db, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
  .then(() => console.log("Conexion a base de datos establecida"))
  .catch((err) => console.log(err));

module.exports = { app, port };
