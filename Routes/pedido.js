const express = require('express');
const { nuevoPedido, Pedidos, cambiarPedido, pedidoDe, pedidosEnCurso } = require('../Controllers/pedidoController');
const { verifyToken } = require('../Controllers/usuarioController');
const router = express.Router();

router.post('/nuevo-pedido', nuevoPedido) //(X)
router.post('/cambiar-pedido', verifyToken, cambiarPedido) //(X)
router.post('/pedido-de', verifyToken, pedidoDe) //(X)

router.get('/pedidos',verifyToken,Pedidos)// (X)
router.get('/en-curso',pedidosEnCurso) //(X)

module.exports = router;