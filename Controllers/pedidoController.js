const pool = require("../pool");

exports.nuevoPedido = (req, res) => {
  let p = req.body;
  // DEC: Pedido Declinado
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
        if (typeof p.HoraAceptado === "undefined") {
          if (ant.HoraAceptado == null) {
            HoraAceptado = "null";
          }
          else {
            HoraAceptado = "'" + ant.HoraAceptado + "'";
          }
        } else {
          HoraAceptado = `'${p.HoraAceptado}'`;
          // HoraAceptado = `'${HoraAceptado}'`;
        }
        HoraPreparado = "";
        if (typeof p.HoraPreparado === "undefined") {
          if (ant.HoraPreparado == null) {
            HoraPreparado = "null";
          }
          else {
            HoraPreparado = "'" + ant.HoraPreparado + "'";
          }
        } else {
          HoraPreparado = `'${p.HoraPreparado}'`;
          // HoraAceptado = `'${HoraAceptado}'`;
        }

        HoraLlegada = "";
        if (typeof p.HoraLlegada === "undefined") {
          if (ant.HoraLlegada == null) {
            HoraLlegada = "null";
          }
          else {
            HoraLlegada = "'" + ant.HoraLlegada + "'";
          }
        } else {
          HoraLlegada = `'${p.HoraLlegada}'`;
          // HoraAceptado = `'${HoraAceptado}'`;
        }

        let NumRepartidor = '';
        if(typeof p.NumRepartidor === 'undefined)'){
          if(ant.NumRepartidor = null){
            NumRepartidor = 'null;'
          } else {
            NumRepartidor = `'${ant.NumRepartidor}'`
          }
        } else {
          NumRepartidor = `'${p.NumRepartidor}'`
        }
        console.log(p.HoraAceptado)
        try {
          pool
            .query(
              `update Pedido set NumRepartidor = ${NumRepartidor}, Estado = '${Estado}', Total = ${Total}, HoraAceptado = ${HoraAceptado}, HoraPreparado = ${HoraPreparado}, HoraLlegada = ${HoraLlegada} where NumPedido = ${p.NumPedido}`
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
          res.json(response);
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
          res.json(response);
        }
      });
  } catch (error) {
    res.status(500).send({ error: "Ocurrio un error" });
  }
};
exports.pedidosEsperando = (req, res) => {
  try {
    pool
      .query(
        `select * from Pedido p, Cliente c where p.Tel = c.Tel and Estado = "ECP" order by HoraPedido;`
      )
      .then((response, err) => {
        if (err) {
          res.status(500).send({ error: "Ocurrio un error" });
        }
        if (response) {
          res.json(response);
        }
      });
  } catch (error) {
    res.status(500).send({ error: "Ocurrio un error" });
  }
};

exports.pedidosEnProceso = (req, res) => {
  try {
    pool
      .query(
        `select * from Pedido p, Cliente c where p.Tel = c.Tel and Estado = "REP" order by HoraAceptado;`
      )
      .then((response, err) => {
        if (err) {
          res.status(500).send({ error: "Ocurrio un error" });
        }
        if (response) {
          res.json(response);
        }
      });
  } catch (error) {
    res.status(500).send({ error: "Ocurrio un error" });
  }
};

exports.pedidosEnCamino = (req, res) => {
  try {
    pool
      .query(
        `select * from Pedido p, Cliente c where p.Tel = c.Tel and Estado = "RSP" order by HoraPreparado;`
      )
      .then((response, err) => {
        if (err) {
          res.status(500).send({ error: "Ocurrio un error" });
        }
        if (response) {
          res.json(response);
        }
      });
  } catch (error) {
    res.status(500).send({ error: "Ocurrio un error" });
  }
};

