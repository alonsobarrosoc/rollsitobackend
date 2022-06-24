const express = require('express')
const router = express.Router()
const {addPidioExtra} = require('../Controllers/pidioExtraController')

router.post('/nuevo', addPidioExtra)

module.exports = router;