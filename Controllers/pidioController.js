const pool = require("../pool");

exports.nuevoPidio = (req, res) => {
  let p = req.body;
  try {
    pool
      .query(
        //   FALTAN LOS VALORES
        `insert into Pidio values('${p.idArt}', '${p.NumPedido}', '${p.Cant}');`
      )
      .then((response, err) => {
        if (err) {
          console.log(err);
          res.status(500).send({ error: "Ocurrio un error" });
        }

        if (response) {
          res.json({ posted: true });
        }
        res.end();
      });
  } catch (error) {
    res.status(500).send({ error: "Ocurrio un error" });
  }
};

// FALTA

exports.cambiarPidio = (req, res) => {
  let p = req.body;
  let pedido = {};
  let pidio = {};

  try {
    pool
      .query(`select * from Pedido where Estado != "RLD" and Tel = "${p.Tel}"`)
      .then((response, err) => {
        if (err) {
          console.log(err);
        }
        if (response) {
          pedido = response[0];
        }

        try {
          pool
            .query(`select * from Pidio where NumPedido = ${pedido.NumPedido}`)
            .then((resp, er) => {
              if (er) {
                res.status(500).send({ error: "Ocurrio un error" });
              }
              if (resp) {
                pidio = resp[0];
              }

              console.log(pidio);
              console.log();
              Cant = "";
              if (typeof p.Cant !== "undefined") {
                Cant = p.Cant;
              } else {
                Cant = pidio.Cant;
              }
              try {
                pool
                  .query(
                    `update Pidio set Cant = '${Cant}' where NumPedido = '${pedido.NumPedido}'`
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
      });
  } catch (e) {
    res.status(500).send({ error: "Ocurrio un error" });
  }
};
