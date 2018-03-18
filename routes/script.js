var express = require('express');
var router = express.Router();
var scriptController = require('../controllers/scriptController');


router.get('/execute/:script_name', scriptController.script_exec_get);

router.get('/registered', scriptController.scripts_registered_get);

router.get('/:name', scriptController.script_get);

router.post('/register', scriptController.script_register_post);

router.put('/unregister', scriptController.script_unregister_put);

module.exports = router;