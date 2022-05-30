const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require('body-parser');


// const usuario = require('./Routes/')

const app = express();

// middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
require("dotenv").config();

// routes
app.get("/api/test", (req, res) => {
  res.json({ message: "Funciona" });
});

app.use("/api/usuario", require("./Routes/usuario"))
app.use("/api/articulo",require("./Routes/articulo"))




// port
const port = process.env.PORT;

// listen port
app.listen(port, () => {
  console.log(`Alicacion funciona en ${port}`);
});