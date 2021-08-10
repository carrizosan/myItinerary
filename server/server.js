const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const cors = require("cors");
const { mongoURI: db } = require("./config/keys");
const mongoose = require("mongoose");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", require("./routes/cities"));
app.use("/api", require("./routes/users"));
app.use("/api", require("./routes/itineraries"));

mongoose
  .connect(db, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
  .then(() => console.log("Conexion a base de datos establecida"))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`El servidor se esta ejecutando en el puerto: ${port}`);
});
