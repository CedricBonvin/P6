const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const multer =require("../middleware/multer_config");

const sauceCtrl = require('../controllers/sauce');

router.post('/sauces',auth, multer, sauceCtrl.createSauce);
router.get("/sauces", auth, sauceCtrl.displaySauce);
router.get("/sauces/:id", auth, sauceCtrl.oneSauce);
router.delete("/sauces/:id", auth, sauceCtrl.deleteSauce)

module.exports = router;