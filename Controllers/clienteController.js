const pool = require("../pool");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.nuevoCliente = async (req, res) => {
  let cli = req.body;
  await prisma.cliente.create({ data: cli });
  res.json("created");
  // try {
  //   pool
  //     .query(`insert into Cliente values('${cli.Tel}', '${cli.Dir}', '${cli.Nombre}');`)
  //     .then((response, err) => {
  //       if (err) {
  //         console.log(err);
  //         res.status(500).send({ error: "Ocurrio un error" });
  //       }

  //       if (response) {
  //         res.json({ posted: true });
  //       }
  //       res.end();
  //     });
  // } catch (err) {
  //   res.status(500).send({ error: "Ocurrio un error" });
  // }
};

exports.cliente = (req, res) => {
  let tel = req.query.tel;
  try {
    pool
      .query(`select * from Cliente where Tel = '${tel}'`)
      .then((response, err) => {
        if (err) {
          console.log(err);
          res.status(500).send({ error: "Ocurrio un error" });
        }

        if (response) {
          res.json(response[0]);
        }
        res.end();
      });
  } catch (err) {
    res.status(500).send({ error: "Ocurrio un error" });
  }
};

exports.cambiarCliente = (req, res) => {
  let us = req.body;
  let ant = {};

  try {
    pool
      .query(`select * from Cliente where Tel = ${us.Tel};`)
      .then((response, err) => {
        if (err) {
          res.status(500).send({ error: "Ocurrio un error" });
        }
        if (response) {
          ant = response[0];
        }

        Nombre = "";
        if (typeof us.Nombre !== "undefined") {
          Nombre = us.Nombre;
        } else {
          Nombre = ant.Nombre;
        }

        Dir = "";
        if (typeof us.Dir !== "undefined") {
          Dir = us.Dir;
        } else {
          Dir = ant.Dir;
        }
        try {
          pool
            .query(
              `update Cliente set Nombre = '${Nombre}', Dir = '${Dir}' where Tel = '${us.Tel}'`
            )
            .then((response, err) => {
              if (err) {
                res.status(500).send({ error: "Ocurrio un error" });
              }
              if (response) {
                res.json({ updated: true });
              }
            });
        } catch (e) {
          res.status(500).send({ error: "Ocurrio un error" });
        }
      });
  } catch (e) {
    res.status(500).send({ error: "Ocurrio un error" });
  }
};
