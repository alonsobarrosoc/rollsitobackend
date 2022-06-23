const expresss = require('express')
const router = expresss.Router()
const {extras, addExtra, extrasSinAsignarParaArt} = require('../Controllers/extraController')
const { verifyTokenAdmin } = require('../Controllers/usuarioController')
router.get('/extras', extras)
router.get('/extras-sin-asignar', verifyTokenAdmin, extrasSinAsignarParaArt)
router.post('/nuevo',verifyTokenAdmin,addExtra)

module.exports = router;