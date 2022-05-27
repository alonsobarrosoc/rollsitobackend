const pool = require("../pool")


exports.nuevoUsuario = (req, res) => {
    let us = req.body;
    try{
        pool.query(`insert into Usuario values('${us.username}', '${us.password}');`)
        .then((response, err) => {
            if(err)
                // res.json(err);
                console.log(err);

            if(response)
                res.json({posted:true})
            res.end()
        })
    }catch(err){
        return res.json(err);
    }
}
