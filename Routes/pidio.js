const express = require('express');
const { nuevoPidio,  orden, borrarPidio  } = require('../Controllers/pidioController');
const router = express.Router();



router.post('/nuevo', nuevoPidio); //(X)
// router.post('/cambiar', cambiarPidio) //(X)
router.get('/orden', orden)
// router.get('/orden-en-proceso', ordenEnProceso)
router.delete('/borrar', borrarPidio)


module.exports = router;