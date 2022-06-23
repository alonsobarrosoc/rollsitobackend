const pool = require("../pool");
const fs = require("fs");
const formidable = require("formidable");

exports.nuevoArt = (req, res) => {
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
        strFoto = new Buffer.from(bitmap).toString("base64");
      }
      pool
        .query(
          `insert into Articulo (Ingredientes, Nombre, Disponible, Precio, Foto) values('${fields.Ingredientes}', '${fields.Nombre}',${fields.Disponible}, ${fields.Precio}, '${strFoto}');`
        )
        .then((response, err) => {
          if (err) {
            res.status(500).send({ error: "Ocrrio un error" });
          }
          if (response) {
            // console.log(strFoto);
            res.json({ posted: true });
          }
          res.end();
        });
    });
  } catch (e) {
    res.status(500).send({ error: "Ocurrio un error" });
  }
};

exports.ArticulosSinFotos = (req, res) => {
  try {
    pool
      .query(
        `select idArt, Ingredientes, Nombre, Disponible, Precio from Articulo;`
      )
      .then((response, err) => {
        if (err) {
          res.status(500).send({ error: "Ocurrio un error" });
        }
        if (response) {
          res.json(response);
        }
        res.end();
      });
  } catch (e) {
    res.status(500).send({ error: "Ocurrio un error" });
  }
};

exports.FotoArt = (req, res) => {
  idArt = req.query.idArt;
  try {
    pool
      .query(`select Foto from Articulo where idArt = ${idArt}`)
      .then((response, err) => {
        if (err) {
          res.status(500).send({ error: "Ocurrio un error" });
        }
        if (response) {
          const buf = new Buffer.from(response[0].Foto, "base64");

          res.send(buf);
        }
      });
  } catch (e) {
    res.status(500).send({ error: "Ocurrio un error" });
  }
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
