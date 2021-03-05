const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const strongPw = require("../middleware/strongPassword")
const exclu = require("../middleware/PW_carc_exclu")
const verifEmail = require("../middleware/verifEmail")

router.post('/auth/signup', strongPw, exclu, verifEmail, userCtrl.signup);
router.post('/auth/login', userCtrl.login);

module.exports = router;