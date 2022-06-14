const express = require("express");
const { nuevoArt, ArticulosSinFotos, FotoArt, cambiarArtSinFoto, Cambiarfoto, nuevoArticulo } = require("../Controllers/articuloController");
const {  verifyTokenAdmin } = require("../Controllers/usuarioController");
const router = express.Router();

router.post('/nuevo-articulo',verifyTokenAdmin, nuevoArticulo) //(X)
router.post('/cambiar-art',verifyTokenAdmin, cambiarArtSinFoto) //(X)
router.post('/cambiar-foto', verifyTokenAdmin, cambiarArtSinFoto) //(X)

router.get('/articulos',ArticulosSinFotos); //(X)
router.get('/foto', FotoArt); //(X)

module.exports = router;