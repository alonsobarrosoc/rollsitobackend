const pool = require("../pool");

exports.porArt = (req, res) => {
  const idArt = req.query.idArt;
  try {
    pool
      .query(`select pte.idE, Nombre, Descripcion,Precio from PuedeTenerExtra pte, Extra e where pte.idE = e.idE and idArt = ${idArt};`)
      .then((response, err) => {
        if (err) {
            console.log(err);
          res.status(501).send({ error: "Ocurrio un error" });
        }
        if (response) {
          res.json(response);
        }
      });
  } catch (e) {
    console.log(e)
    res.status(500).send({ error: "Ocurrio un error" });
  }
};


exports.agregarPTE = (req, res) => {
  pte = req.body
  try {
    pool
      .query(`insert into PuedeTenerExtra values(${pte.idArt}, ${pte.idE})`)
      .then((response, err) => {
        if (err) {
            console.log(err);
          res.status(501).send({ error: "Ocurrio un error" });
        }
        if (response) {
          res.json({posted: true});
        }
      });
  } catch (e) {
    console.log(e)
    res.status(500).send({ error: "Ocurrio un error" });
  }
}

exports.quitarPTE = (req, res) => {
  let idArt = req.query.idArt;
  let idE = req.query.idE
   try {
    pool
      .query(`delete from PuedeTenerExtra where idArt = ${idArt} and idE = ${idE}`)
      .then((response, err) => {
        if (err) {
            console.log(err);
          res.status(501).send({ error: "Ocurrio un error" });
        }
        if (response) {
          res.json({deleted: true});
        }
      });
  } catch (e) {
    console.log(e)
    res.status(500).send({ error: "Ocurrio un error" });
  } 
}