const pool = require("../pool");

exports.addPidioExtra = (req, res) => {
  pe = req.body;
  try {
    pool
      .query(
        `insert into PidioExtra(Cant, idE) values(${pe.Cant},${pe.idE});`
      )
      .then((response, err) => {
        if (err) {
          console.log(err);
        }
        if (response) {
            console.log(response.insertId);

            // pool.query(`update from PidioExtra set idPE=${response.}`)



          res.json(response);
        }
      });
  } catch (error) {
    res.status(500).send({ error: "Ocurrio un error" });
  }
};
