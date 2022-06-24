const pool = require("../pool");

exports.nuevoPidio = (req, res) => {
  let p = req.body;
  try {
    pool
      .query(
        //   FALTAN LOS VALORES
        `insert into Pidio(idArt, NumPedido) values('${p.idArt}', ${p.NumPedido});`
      )
      .then((response, err) => {
        if (err) {
          console.log(err);
          res.status(500).send({ error: "Ocurrio un error" });
        }

        if (response) {
          pool;
          // .query(`update Pedido set idPidio=${response.insertId}`)
          // .then((response, err) => {
          if (err) {
            console.log(err);
            res.status(500).send({ error: "Ocurrio un error" });
          }
          if (response) {
            res.json({ posted: true });
          }
          // });
          // res.end();
        }
      });
  } catch (error) {
    res.status(500).send({ error: "Ocurrio un error" });
  }
};

exports.orden = (req, res) => {
  // p = req.body
  NumPedido = req.query.NumPedido;
  try {
    pool
      .query(
        // `select a.Precio, pidio.idPidio, a.idArt, idPE, pedido.NumPedido, pedido.Tel, Estado, HoraPedido, a.Nombre from Pidio pidio, Pedido pedido, Articulo a where pidio.NumPedido = pedido.NumPedido and a.idArt = pidio.idArt and pidio.NumPedido = ${NumPedido} and Estado = "ECP";`
        `select count(pie.idPE) as Cant, pi.idArt, a.Nombre as NombreA, a.Precio as PrecioP, pie.idPE, e.Nombre as NombreE, e.Precio as PrecioE, ((a.Precio +e.Precio ) * count(pie.idPE)) as Total
from Articulo a, Pedido pe, Pidio pi, PidioExtra pie, Extra e
where pe.NumPedido = pi.NumPedido and
pi.idArt = a.idArt and 
(pi.idPE IS NULL or pi.idPE = pie.idPE) and
e.idE = pie.idE and
pe.NumPedido = ${NumPedido} and 
pe.Estado = "ECP"
group by pie.idPE, pi.idArt
;`
      )
      .then((response, err) => {
        if (err) {
          console.log(err);
        }
        if (response) {
          res.json(response);
        }
      });
  } catch (error) {
    res.status(500).send({ error: "Ocurrio un error" });
  }
};

exports.ordenEnProceso = (req, res) => {
  NumPedido = req.query.NumPedido;
  try {
    pool
      .query(
        // `select a.Precio, pidio.idPidio, a.idArt, idPE, pedido.NumPedido, pedido.Tel, Estado, HoraPedido, a.Nombre from Pidio pidio, Pedido pedido, Articulo a where pidio.NumPedido = pedido.NumPedido and a.idArt = pidio.idArt and pidio.NumPedido = ${NumPedido} and Estado = "ECP";`
        `select count(pie.idPE) as Cant, pi.idArt, a.Nombre as NombreA, a.Precio as PrecioP, pie.idPE, e.Nombre as NombreE, e.Precio as PrecioE, ((a.Precio +e.Precio ) * count(pie.idPE)) as Total
from Articulo a, Pedido pe, Pidio pi, PidioExtra pie, Extra e
where pe.NumPedido = pi.NumPedido and
pi.idArt = a.idArt and 
(pi.idPE IS NULL or pi.idPE = pie.idPE) and
e.idE = pie.idE and
pe.NumPedido = ${NumPedido} and 
pe.Estado = "REP"
group by pie.idPE, pi.idArt
;`
      )
      .then((response, err) => {
        if (err) {
          console.log(err);
        }
        if (response) {
          res.json(response);
        }
      });
  } catch (error) {
    res.status(500).send({ error: "Ocurrio un error" });
  }
};


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
