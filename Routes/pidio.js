const express = require('express');
const { nuevoPidio, cambiarPidio, orden, ordenEnProceso } = require('../Controllers/pidioController');
const router = express.Router();



router.post('/nuevo', nuevoPidio); //(X)
router.post('/cambiar', cambiarPidio) //(X)
router.get('/orden', orden)
router.get('/orden-en-proceso', ordenEnProceso)


module.exports = router;