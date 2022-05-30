const pool = require("../pool");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const salt_rounds = 10;

exports.nuevoUsuario = (req, res) => {
  let us = req.body;
  try {
    bcrypt.hash(us.pass, salt_rounds, function (erro, hash) {
      pool
        .query(`insert into Usuario values('${us.username}', '${hash}');`)
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
    });
  } catch (err) {
    res.status(500).send({ error: "Ocurrio un error" });
    // return res.json(err);
  }
};

exports.login = (req, res) => {
  let us = req.body;
  try {
    pool
      .query(`select * from Usuario where username='${us.username}'`)
      .then((response, err) => {
        if (err) {
          console.log(err);
          res.status(500).send({ error: "Ocurrio un error" });
        }
        if (response) {
          bcrypt.compare(us.pass, response[0].pass).then(function (result) {
            if (result) {
              var token = jwt.sign(response[0], process.env.KEY);
              console.log(token);
              res.status(200).json({ token });
            } else {
              res.status(403).send({ error: "Prohibido" });
            }
          });
        }
      });
  } catch (err) {
    res.status(500).send({ error: "Ocurrio un error" });
  }
};

exports.cambiarPassword = (req, res) => {
  let us = req.body;
  if (us.pass1 != us.pass2) {
    res.status(500).send({ error: "Las contraseñas no coinciden" });
  }
  try {
    pool
      .query(`select * from Usuario where username='${us.username}'`)
      .then((response, err) => {
        if (err) {
          console.log(err);
        }
        if (response) {
          bcrypt.compare(us.pass1, response[0].pass).then(function (result) {
            if (result) {
                bcrypt.hash(us.nuevoPass, salt_rounds, function(e, hash){
                    pool
                    .query(
                        `update Usuario set pass='${hash}' where username = '${us.username}'`
                        )
                        .then(function (resp, erro) {
                            if (erro) {
                                console.log(erro);
                                res.status(500).send({ error: "Ocurrio un error" });
                            }
                            if (resp) {
                                res.status(200).json({ posted: true });
                            }
                        });
                })
                    } else {
                        res.status(403).json({ error: "Prohibido" });
                    }
                });
                //   res.end();
            }
        });
    } catch (error) {
    res.status(500).send({ error: "Ocurrio un error" });
  }
};
