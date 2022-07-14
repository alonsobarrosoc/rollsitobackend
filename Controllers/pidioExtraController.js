const pool = require("../pool");
const { PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();

exports.addPidioExtra = async(req, res) => {
  pe = req.body;
  const result = await prisma.PidioExtra.create({
    data:{
      Cant: Number(pe.Cant),
      idE: Number(pe.idE)
    }
  })
  res.json(result)
};
