const express = require("express");
const { nuevoCliente, cliente, cambiarCliente } = require("../Controllers/clienteController");
const router = express.Router();

router.post('/nuevo-cli',nuevoCliente) //(X)
router.post('/cambiar-cli', cambiarCliente) //(X)

router.get('/cliente', cliente) //(X)

module.exports = router;