var scriptHistory = require('../models/history');
var path = require('path');
var spawn = require("child_process").spawn;

// Create endpoint /history for GET
exports.history_get = function(req, res){
    scriptHistory.find({},'-_id name timeOfExec' ,function(err, scripts){
        if(err){
            res.send(err);
        }
        res.send(scripts);
    })
};