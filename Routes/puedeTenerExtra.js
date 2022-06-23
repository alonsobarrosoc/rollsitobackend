const express = require('express')
const router = express.Router()
const {porArt, agregarPTE, quitarPTE} = require('../Controllers/puedeTenerExtraController')
const { verifyTokenAdmin } = require('../Controllers/usuarioController')

router.get('/por-art',porArt)

router.post('/agregar',verifyTokenAdmin,agregarPTE)

router.delete('/quitar',verifyTokenAdmin, quitarPTE)

module.exports = router;