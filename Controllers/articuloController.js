const pool = require("../pool");
const fs = require("fs");
const formidable = require("formidable");

exports.nuevoArticulo = (req, res) => {
  art = req.body;
  var bitmap = fs.readFileSync(art.Foto);
  var strFoto = new Buffer.from(bitmap).toString("base64");
  try {
    pool
      .query(
        `insert into Articulo (Ingredientes, Nombre, Disponible, Precio, Foto) values('${art.Ingredientes}', '${art.Nombre}',${art.Disponible}, ${art.Precio}, '${strFoto}');`
      )
      .then((response, err) => {
        if (err) {
          res.status(500).send({ error: "Ocrrio un error" });
        }
        if (response) {
          console.log(strFoto);
          res.json({ posted: true });
        }
        res.end();
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
  idArt = req.body.idArt;
  try {
    pool
      .query(`select Foto from Articulo where idArt = ${idArt}`)
      .then((response, err) => {
        if (err) {
          res.status(500).send({ error: "Ocurrio un error" });
        }
        if (response) {
          res.json(response);
          // res.json({posted:true})
        }
        res.end();
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
          // console.log(Ingredientes);
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

        // console.log(Ingredientes);

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
  art = req.body;
  var bitmap = fs.readFileSync(art.Foto);
  var strFoto = new Buffer.from(bitmap).toString("base64");

  try {
    pool
      .query(`update Articulo set Foto='${strFoto}' where idArt = ${art.idArt};`)
      .then((response, err) => {
        if (err) {
          res.status(500).send({ error: "Ocrrio un error" });
        }
        if (response) {
          res.json({ posted: true });
        }
        res.end();
      });
  } catch (e) {
    res.status(500).send({ error: "Ocurrio un error" });
  }
};
// exports.articulos = (req, res) => {

// }
