
const express = require('express');
const { nuevoUsuario, login, cambiarPassword, verifyToken } = require('../Controllers/usuarioController');
const router = express.Router();


router.post('/nuevo',nuevoUsuario);
router.post('/login', login);
router.post('/cambiar-pass',verifyToken, cambiarPassword);

module.exports = router;