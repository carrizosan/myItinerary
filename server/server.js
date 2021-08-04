const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const { mongoURI: db } = require("./config/keys");
const mongoose = require("mongoose");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cors());

app.use("/cities", require("./routes/cities"));

mongoose
  .connect(db, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
  .then(() => console.log("Conexion a base de datos establecida"))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`El servidor se esta ejecutando en el puerto: ${port}`);
});
