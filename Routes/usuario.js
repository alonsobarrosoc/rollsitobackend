
const express = require('express');
const { nuevoUsuario, login, cambiarPassword } = require('../Controllers/usuarioController');
const router = express.Router();


router.post('/nuevo',nuevoUsuario);
router.post('/login', login);
router.post('/cambiar-pass', cambiarPassword);

module.exports = router;