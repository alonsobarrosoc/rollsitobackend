const express = require('express');
const { nuevoPidio, cambiarPidio } = require('../Controllers/pidioController');
const router = express.Router();



router.post('/nuevo', nuevoPidio); //(X)
router.post('/cambiar', cambiarPidio) //(X)



module.exports = router;