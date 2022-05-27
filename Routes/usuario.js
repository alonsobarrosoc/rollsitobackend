
const express = require('express');
const { nuevoUsuario } = require('../Controllers/usuarioController');
const router = express.Router();


router.post('/nuevo',nuevoUsuario);

module.exports = router;