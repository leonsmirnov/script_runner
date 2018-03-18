var express = require('express');
var router = express.Router();
var history_controller = require('../controllers/historyController');


router.get('/', history_controller.history_get); 

module.exports = router;