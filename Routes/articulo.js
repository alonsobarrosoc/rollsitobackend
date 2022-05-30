const express = require("express");
const { nuevoArt } = require("../Controllers/articuloController");
const router = express.Router();

router.post('/nuevo-art', nuevoArt)

module.exports = router;