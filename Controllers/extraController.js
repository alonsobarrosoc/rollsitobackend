const pool = require("../pool");

exports.extras = (req, res) => {
    idArt = req.query.idArt
  try {
    pool.query(`select * from Extra`).then((resp, err) => {
      if (err) {
        res.status(500).send({ error: "Ocrrio un error" });
      }
      if (resp) {
        // console.log(strFoto);
        res.json(resp);
      }
      res.end();
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: "Ocurrio un error" });
  }
};
exports.addExtra = (req, res) => {
  let ex = req.body;
  try {
    pool
      .query(
        `insert into Extra(Nombre, Descripcion, Precio) values('${ex.Nombre}', '${ex.Descripcion}', ${ex.Precio})`
      )
      .then((resp, err) => {
        if (err) {
          res.status(500).send({ error: "Ocrrio un error" });
        }
        if (resp) {
          // console.log(strFoto);
          res.json({ posted: true });
        }
        res.end();
      });
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: "Ocurrio un error" });
  }
};

exports.extrasSinAsignarParaArt = (req,res) => {
  let idArt = req.query.idArt;
  try {
    pool
      .query(
        `select * from Extra e where idE not in(select idE from PuedeTenerExtra where idArt = ${idArt});`
      )
      .then((resp, err) => {
        if (err) {
          res.status(500).send({ error: "Ocrrio un error" });
        }
        if (resp) {
          // console.log(strFoto);
          res.json(resp);
        }
        res.end();
      });
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: "Ocurrio un error" });
  }
};
