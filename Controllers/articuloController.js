const pool = require("../pool");
const fs = require("fs");
const formidable = require("formidable");

exports.nuevoArt = (req, res) => {
  let form = new formidable.IncomingForm();

  form.parse(req, function (err, fields, files) {
    if (err) {
      return res.status(400).json({ error: "No se puedo cargar la imagen" });
    }
    if (files.Foto) {
      if (files.Foto.size > 16000000) {
        return res
          .status(400)
          .json({ error: "La imagen debe pesar menos de 16 MB" });
      }
    }
    // console.log(files.Foto)
    var bitmap = fs.readFileSync(files.Foto.filepath);
    var strFoto = new Buffer.from(bitmap).toString("base64");

    try {
      pool
        .query(
          `insert into Articulo (Ingredientes, Nombre, Disponible, Precio, Foto) values('${fields.Ingredientes}', '${fields.Nombre}',${fields.Disponible}, ${fields.Precio}, '${strFoto}');`
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
    } catch (e) {
      res.status(500).send({ error: "Ocurrio un error" });
    }
  });
};

// exports.articulos = (req, res) => {

// }
