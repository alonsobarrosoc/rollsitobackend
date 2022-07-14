const express = require("express");
const {
  nuevoPedido,
  Pedidos,
  pedidosEsperando,
  pedidosEnProceso,
  pedidosEnCamino,
  pedidosFinalizados,
  changePedido,
  verificarClienteConPedido,
} = require("../Controllers/pedidoController");
const { verifyToken } = require("../Controllers/usuarioController");
const router = express.Router();

router.post("/nuevo-pedido", nuevoPedido); //(X)
router.post("/cambiar-pedido",  changePedido); //(X)


router.get("/pedidos", verifyToken, Pedidos); // (X)
// router.get('/en-curso',pedidosEnCurso) //(X)
router.get("/pedidos-esperando", verifyToken, pedidosEsperando);
router.get("/pedidos-en-proceso", verifyToken, pedidosEnProceso);
router.get("/pedidos-en-camino", verifyToken, pedidosEnCamino);
router.get("/pedidos-finalizados", verifyToken, pedidosFinalizados);
router.get("/verificar-cliente-pedido", verificarClienteConPedido)

module.exports = router;
