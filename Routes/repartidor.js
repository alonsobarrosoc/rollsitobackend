const { repartidores, addRepartidor } = require("../Controllers/repartidorController");

const express = require('express');
const { verifyToken } = require("../Controllers/usuarioController");
const router = express.Router()

router.get('/repartidores',verifyToken,repartidores)

router.post('/nuevo',verifyToken, addRepartidor)


module.exports = router;