const pool = require("../pool");
const fs = require("fs");
const formidable = require("formidable");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.nuevoArt = async (req, res) => {
  try {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (er, fields, files) => {
      let path = files.Foto.filepath;
      let strFoto = "";
      if (files.Foto) {
        if (files.Foto.size > 10000000) {
          return res.status(400).json({
            error: "Image too big",
          });
        }
        var bitmap = fs.readFileSync(path);
        strFoto = new Buffer.from(bitmap);
      }
      prisma.Articulo.create({
        data: {
          Nombre: fields.Nombre,
          Ingredientes: fields.Ingredientes,
          Disponible: true,
          Precio: Number(fields.Precio),
          Foto: strFoto,
          Recomendacion: Boolean(fields.Recomendacion)
        },
      }).then((resp) => {
        res.json("created");
      });
      // res.json("created");

      // console.log(datos);
    });
  } catch (e) {
    res.status(500).send({ error: "Ocurrio un error" });
  }
  // res.json('created')
};

exports.artsDisponibles = async (req, res) => {
  const arts = await prisma.articulo.findMany({
    where: {
      Disponible: true,
    },
    select: {
      idArt: true,
      Ingredientes: true,
      Nombre: true,
      Precio: true,
    },
  });
  res.json(arts);
};

exports.ArticulosSinFotos = async (req, res) => {
  const arts = await prisma.articulo.findMany({
    select: {
      idArt: true,
      Ingredientes: true,
      Nombre: true,
      Disponible: true,
      Precio: true,
    },
  });
  res.json(arts);
};

exports.FotoArt = async (req, res) => {
  idArt = req.query.idArt;
  let respFoto = await prisma.Articulo.findMany({
    where: {
      idArt: Number(idArt),
    },
    select: {
      Foto: true,
    },
  });
  res.writeHead(200, {
    "Content-Type": "image/png",
    "Content-Length": respFoto[0].Foto.length,
  });
  res.end(respFoto[0].Foto);
};

exports.cambiarArtSinFoto = (req, res) => {
  let art = req.body;
  let ant = {};
  try {
    pool
      .query(
        `select idArt, Ingredientes, Nombre, Disponible, Precio from Articulo where idArt = ${art.idArt};`
      )
      .then((response, err) => {
        if (err) {
          res.status(500).send({ error: "Ocurrio un error" });
        }
        if (response) {
          ant = response[0];
        }

        Ingredientes = "";
        if (typeof art.Ingredientes !== "undefined") {
          Ingredientes = art.Ingredientes;
        } else {
          Ingredientes = ant.Ingredientes;
        }

        Nombre = "";
        if (typeof art.Nombre !== "undefined") {
          Nombre = art.Nombre;
        } else {
          Nombre = ant.Nombre;
        }

        Disponible = "";
        if (typeof art.Disponible !== "undefined") {
          Disponible = art.Disponible;
        } else {
          Disponible = ant.Disponible;
        }

        Precio = "";
        if (typeof art.Precio !== "undefined") {
          Precio = art.Precio;
        } else {
          Precio = ant.Precio;
        }

        try {
          pool
            .query(
              `update Articulo set Ingredientes='${Ingredientes}', Nombre = '${Nombre}', Disponible = ${Disponible}, Precio = ${Precio} where idArt = ${art.idArt}`
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

exports.cambiarArtFoto = (req, res) => {
  try {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (er, fields, files) => {
      let path;
      let strFoto;
      if (files.Foto) {
        if (files.Foto.size > 10000000) {
          return res.status({ error: "Img too big" });
        }
        path = files.Foto.filepath;
      }
      console.log(fields);
      var bitmap = fs.readFileSync(path);
      strFoto = new Buffer.from(bitmap).toString("base64");

      pool
        .query(
          `update Articulo set Foto='${strFoto}' where idArt = ${fields.idArt};`
        )
        .then((response, err) => {
          if (err) {
            res.status(500).send({ error: "Ocrrio un error" });
          }
          if (response) {
            res.json({ posted: true });
          }
          res.end();
        });
    });
  } catch (e) {
    res.status(500).send({ error: "Ocurrio un error" });
  }
};

exports.artsRelacionados = async (req, res) => {
  let arts = await prisma.Articulo.findMany({
    where: {
      Recomendacion: true,
      Disponible: true
    },
    select:{
      idArt:true,
      Ingredientes: true,
      Precio: true,
      Nombre: true

    }
  })
  res.json(arts)
}
