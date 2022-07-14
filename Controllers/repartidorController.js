const pool = require("../pool");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.repartidores = async (req, res) => {
  const reparts = await prisma.Repartidor.findMany();
  res.json(reparts);
};
exports.addRepartidor = async (req, res) => {
  let r = req.body;
  await prisma.Repartidor.create({ data: r });
  res.json("created");
};
