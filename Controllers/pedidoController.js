// const { prisma } = require("@prisma/client");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.nuevoPedido = async (req, res) => {
  let p = req.body;
  p["Estado"] = "PID";
  // p["HoraPedido"] = new Date();
  // PID: Pidiendo
  // ECP: Esperando confirmacin del pedido
  // REP: Restaurante esta preparando
  // RSP: Repartidor salio con el pedido
  // RLD: Repartidor llego al domicilio
  // DEC: Pedido Declinado

  await prisma.Pedido.create({ data: p });
  res.json("created");
};

exports.Pedidos = async (req, res) => {
  const todos = await prisma.Pedido.findMany();
  res.json(todos);
};

exports.changePedido = async (req, res) => {
  let NumPedido = req.query.NumPedido;
  let p = req.body;
  let datos = p;
  switch (p.Estado) {
    case "ECP":
      datos["HoraPedido"] = new Date();
      break;
    case "REP":
      datos["HoraAceptado"] = new Date();
      break;
    case "RSP":
      datos["HoraPreparado"] = new Date();
      break;
    case "RLD":
      datos["HoraLlegada"] = new Date();
      break;
  }
  delete datos["NumPedido"];
  await prisma.Pedido.update({
    where: { NumPedido: Number(NumPedido) },
    data: datos,
  });
  res.json("updated");
};

exports.pedidosEsperando = async (req, res) => {
  const pedidos = await prisma.Pedido.findMany({
    where: {
      HoraPedido: {
        gte: new Date().toISOString(),
      },
      Estado: "ECP",
    },
    select: {
      NumPedido: true,
      HoraPedido: true,
      Cliente: {
        select: {
          Nombre: true,
        },
      },
    },
    orderBy: {
      HoraPedido: "asc",
    },
  });
  res.json(pedidos);
};

exports.pedidosEnProceso = async (req, res) => {
  const pedidos = await prisma.Pedido.findMany({
    where: {
      HoraPedido: {
        gte: new Date().toISOString(),
      },
      Estado: "REP",
    },
    select: {
      NumPedido: true,
      HoraPedido: true,
      HoraAceptado: true,
      Cliente: {
        select: {
          Nombre: true,
        },
      },
    },
    orderBy: {
      HoraAceptado: "asc",
    },
  });
  res.json(pedidos);
};

exports.pedidosEnCamino = async (req, res) => {
  const pedidos = await prisma.Pedido.findMany({
    where: {
      HoraPedido: {
        gte: new Date().toISOString(),
      },
      Estado: "RSP",
    },
    select: {
      NumPedido: true,
      HoraPedido: true,
      HoraAceptado: true,
      HoraPreparado: true,
      Cliente: {
        select: {
          Nombre: true,
        },
      },
      Repartidor: {
        select: {
          Nombre: true,
          Tel: true,
        },
      },
    },
    orderBy: {
      HoraPreparado: "asc",
    },
  });
  res.json(pedidos);
};
exports.pedidosFinalizados = async (req, res) => {
  const pedidos = await prisma.Pedido.findMany({
    where: {
      HoraPedido: {
        gte: new Date().toISOString(),
      },
      Estado: "RLD",
    },
    select: {
      NumPedido: true,
      HoraPedido: true,
      HoraAceptado: true,
      HoraPreparado: true,
      HoraLlegada: true,
      Total: true,
      Cliente: {
        select: {
          Nombre: true,
        },
      },
      Repartidor: {
        select: {
          Nombre: true,
          Tel: true,
        },
      },
    },
    orderBy: {
      HoraPreparado: "asc",
    },
  });
  res.json(pedidos);
};

exports.verificarClienteConPedido = async (req, res) => {
  let Tel = req.query.Tel;
  let NumPedido = req.query.NumPedido;
  const p = await prisma.Pedido.findUnique({
    where: {
      NumPedido: Number(NumPedido),
    },
    select: {
      Tel: true,
    },
  });
  if (p.Tel == Number(Tel)) {
    res.json(true);
  } else {
    res.json(false);
  }
};
