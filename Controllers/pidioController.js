const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.nuevoPidio = async (req, res) => {
  let p = req.body;
  if (p.idPE === null) {
    p["idPE"] = null;
  } else {
    p["NumPedido"] = Number(p.NumPedido);
    p["idArt"] = Number(p.idArt);
  }
  const pidio = await prisma.Pidio.create({
    // data:p
    data: {
      idArt: Number(p.idArt),
      NumPedido: Number(p.NumPedido),
      idPE: p.idPE,
    },
  });
  res.json(pidio);
};

exports.orden = async (req, res) => {
  // p = req.body
  NumPedido = req.query.NumPedido;

  const x = await prisma.$queryRaw`(
select count(*) as Cant, e.idE, a.idArt, e.Nombre as NombreExtra, a.Nombre as NombreArticulo, e.Precio as EPrecio, a.Precio as APrecio from Pidio p, Articulo a, Extra e, PidioExtra pe
where p.idArt = a.idArt and p.idPE = pe.idPE and pe.idE = e.idE and p.NumPedido = ${NumPedido}
group by pe.idE, a.idArt
)
union
(
select count(*) as Cant, null as idE, a.idArt, null as NombreExtra, a.Nombre as NombreArticulo, null as EPrecio, a.Precio as APrecio from Pidio p, Articulo a
where p.idArt = a.idArt and p.idPE is null and p.NumPedido = ${NumPedido}
group by a.idArt
);
`;

  x.forEach((element) => {
    element["Cant"] = Number(element.Cant.toString());
  });
  res.json(x);
};

exports.borrarPidio = async (req, res) => {
  let NumPedido = req.query.NumPedido;
  let idArt = req.query.idArt;
  let idE = req.query.idE;
  if (typeof idE === "undefined") {
    idE = null;
  }
  let p = [];
  if (idE !== "null") {
    p = await prisma.Pidio.findMany({
      where: {
        idArt: Number(idArt),
        NumPedido: Number(NumPedido),
        PidioExtra: {
          Extra: {
            idE: Number(idE),
          },
        },
      },
    });
  } else {
    p = await prisma.Pidio.findMany({
      where: {
        idArt: Number(idArt),
        NumPedido: Number(NumPedido),
        idPE: null,
      },
    });
  }
  if (p.length == 0) {
    res.json("Error");
  } else {
    await prisma.Pidio.delete({
      where: {
        idPidio: Number(p[0].idPidio),
      },
    });
    res.json("deleted");
  }
};

// exports.deletePidio = async(req, res) => {

// }
