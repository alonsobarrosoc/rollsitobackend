
const express = require('express');
const { nuevoUsuario, login, cambiarPassword, verifyToken, isAuthenticatedAdmin, isAuthenticated } = require('../Controllers/usuarioController');
const router = express.Router();


router.post('/nuevo',nuevoUsuario);
router.post('/login', login);
router.post('/cambiar-pass',verifyToken, cambiarPassword);

router.get('/isauthadmin', isAuthenticatedAdmin)
router.get('/isauth', isAuthenticated)

module.exports = router;