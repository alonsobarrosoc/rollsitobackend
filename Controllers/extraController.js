const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.extras = async (req, res) => {
  const extras = await prisma.extra.findMany();
  res.json(extras);
};
exports.addExtra = async (req, res) => {
  let ex = req.body;
  let gen;
  if(ex.General ==undefined || ex.General == ''){
    gen = null
  }
  await prisma.Extra.create({
    data: {
      Nombre: ex.Nombre,
      Descripcion: ex.Descripcion,
      Precio: Number(ex.Precio),
      General: Boolean(gen)
    },
  });
  res.json("created");
};

exports.extrasSinAsignarParaArt = async (req, res) => {
  let idArt = req.query.idArt;

  const vinculados = await prisma.PuedeTenerExtra.findMany({
    select: { idE: true },
    where: {
      idArt: Number(idArt),
    },
  });
  let v = [];
  vinculados.forEach((element) => {
    v.push(element.idE);
  });
  const extras = await prisma.Extra.findMany({
    where: {
      idE: {
        notIn: v,
      },
    },
  });
  res.json(extras);
};


exports.extrasGenerales = async(req, res) => {
  let extras = prisma.Extra.findMany({
    where:{
      General: true
    }
  })
  res.json(extras)
}


