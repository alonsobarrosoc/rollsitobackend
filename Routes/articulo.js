const express = require("express");
const { nuevoArt, ArticulosSinFotos, FotoArt, cambiarArtSinFoto, cambiarArtFoto, artsDisponibles, artsRelacionados } = require("../Controllers/articuloController");
const {  verifyTokenAdmin } = require("../Controllers/usuarioController");
const router = express.Router();

router.post('/cambiar-art',verifyTokenAdmin, cambiarArtSinFoto) //(X)
router.post('/cambiar-foto', verifyTokenAdmin, cambiarArtFoto) //(X)
router.post('/nuevoArt',verifyTokenAdmin,nuevoArt)

router.get('/articulos',ArticulosSinFotos); //(X)
router.get('/foto', FotoArt); //(X)
router.get('/artsDisp',artsDisponibles)
router.get('/recomendados', artsRelacionados)

module.exports = router;