const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
// const formidable = require('formidable-express')

const app = express();
require("dotenv").config();

// middlewares
app.use(morgan("dev"));
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
// app.use(formidable())

// routes
app.get("/api/test", (req, res) => {
  res.json({ message: "Funciona" });
});

app.use("/api/usuario", require("./Routes/usuario"));
app.use("/api/articulo", require("./Routes/articulo"));
app.use("/api/cliente", require("./Routes/cliente"));
app.use("/api/pedido", require("./Routes/pedido"));
app.use("/api/pidio", require("./Routes/pidio"));
app.use('/api/extra', require('./Routes/extra'))
app.use('/api/pte', require('./Routes/puedeTenerExtra'))
app.use('/api/pe', require('./Routes/pidioExtra'))


// port
const port = process.env.PORT;

// listen port
app.listen(port, () => {
  console.log(`Alicacion funciona en ${port}`);
});
