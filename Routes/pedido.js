const express = require('express');
const { nuevoPedido, Pedidos, cambiarPedido, pedidoDe, pedidosEnCurso, pedidosEsperando, pedidosEnProceso, pedidosEnCamino } = require('../Controllers/pedidoController');
const { verifyToken } = require('../Controllers/usuarioController');
const router = express.Router();

router.post('/nuevo-pedido', nuevoPedido) //(X)
router.post('/cambiar-pedido', verifyToken, cambiarPedido) //(X)
router.post('/pedido-de', verifyToken, pedidoDe) //(X)

router.get('/pedidos',verifyToken,Pedidos)// (X)
// router.get('/en-curso',pedidosEnCurso) //(X)
router.get('/pedidos-esperando', verifyToken, pedidosEsperando)
router.get('/pedidos-en-proceso', verifyToken, pedidosEnProceso)
router.get('/pedidos-en-camino', verifyToken, pedidosEnCamino)

module.exports = router;