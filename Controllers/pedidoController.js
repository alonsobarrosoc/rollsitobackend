const pool = require("../pool");

exports.nuevoPedido = (req, res) => {
  let p = req.body;

  // ECP: Esperando confirmacin del pedido
  // REP: Restaurante esta preparando
  // RSP: Repartidor salio con el pedido
  // RLD: Repartidor llego al domicilio

  let h = new Date().toISOString().split("T")[1].split("Z")[0];
  try {
    pool
      .query(
        `insert into Pedido (Tel, Estado, HoraPedido) values('${p.Tel}','ECP', '${h}');`
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
  } catch (err) {
    res.status(500).send({ error: "Ocurrio un error" });
  }
};

exports.Pedidos = (req, res) => {
  try {
    pool.query(`select * from Pedido`).then((response, err) => {
      if (err) {
        console.log(err);
        res.status(500).send({ error: "Ocurrio un error" });
      }
      if (response) {
        res.json(response);
      }
    });
  } catch (err) {
    res.status(500).send({ error: "Ocurrio un error" });
  }
};

exports.cambiarPedido = (req, res) => {
  let p = req.body;
  let ant = {};

  try {
    pool
      .query(`select * from Pedido where NumPedido = ${p.NumPedido};`)
      .then((response, err) => {
        if (err) {
          res.status(500).send({ error: "Ocurrio un error" });
        }
        if (response) {
          ant = response[0];
        }

        Estado = "";
        if (typeof p.Estado !== "undefined") {
          Estado = p.Estado;
        } else {
          Estado = ant.Estado;
        }

        Total = "";
        if (typeof p.Total !== "undefined") {
          Total = p.Total;
        } else {
          Total = ant.Total;
        }

        HoraAceptado = "";
        if (typeof p.HoraAceptado !== "undefined") {
          HoraAceptado = p.HoraAceptado;
        } else {
          if (ant.HoraAceptado == null) {
            HoraAceptado = null;
          } else {
            HoraAceptado = "'" + ant.HoraAceptado + "'";
          }
        }

        HoraPreparado = "";
        if (typeof p.HoraPreparado !== "undefined") {
          HoraPreparado = p.HoraPreparado;
        } else {
          if (ant.HoraPreparado == null) {
            HoraPreparado = null;
          } else {
            HoraPreparado = "'" + ant.HoraPreparado + "'";
          }
        }

        HoraLlegada = "";
        if (typeof p.HoraLlegada !== "undefined") {
          HoraLlegada = p.HoraLlegada;
        } else {
          if (ant.HoraLlegada == null) {
            HoraLlegada = null;
          } else {
            HoraLlegada = "'" + ant.HoraLlegada + "'";
          }
        }

        try {
          pool
            .query(
              `update Pedido set Estado = '${Estado}', Total = ${Total}, HoraAceptado = ${HoraAceptado}, HoraPreparado = ${HoraPreparado}, HoraLlegada = ${HoraLlegada} where NumPedido = ${p.NumPedido}`
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

exports.pedidoDe = (req, res) => {
  t = req.body;
  try {
    pool
      .query(
        `select pedido.Tel, pedido.NumPedido, pidio.Cant, a.Nombre, c.Nombre from Pedido pedido, Pidio pidio, Articulo a, Cliente c where pedido.NumPedido = pidio.NumPedido and c.Tel = pedido.Tel and pidio.idArt = a.idArt and pedido.Tel = "${t.Tel}";`
      )
      .then((response, err) => {
        if (err) {
          res.status(500).send({ error: "Ocurrio un error" });
        }
        if (response) {
          res.json(response)
          // res.json({ updated: true });
        }
      });
  } catch (error) {
    res.status(500).send({ error: "Ocurrio un error" });
  }
};

exports.pedidosEnCurso = (req, res) => {
  try {
    pool
      .query(`select * from Pedido where Estado != "RLD";`)
      .then((response, err) => {
        if (err) {
          res.status(500).send({ error: "Ocurrio un error" });
        }
        if (response) {
          res.json(response)
        }
      });
  } catch (error) {
    res.status(500).send({ error: "Ocurrio un error" });
  }
};
