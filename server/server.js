const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(express.json());

app.use(cors());

app.listen(port, () => {
  console.log(`El servidor se esta ejecutando en el puerto: ${port}`);
});
