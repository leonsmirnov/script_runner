var pyScript = require('../models/script');
var scriptHistory = require('../models/history');
var path = require('path');
var spawn = require("child_process").spawn;

// Create endpoint /scripts/registered for GET
exports.scripts_registered_get = function(req, res){
    pyScript.find({isRegistered:true}, '-_id name path isRegistered',function(err, scripts){
        if(err){
            res.send(err);
        }
        res.send(scripts);
    })
};

//Create endpoint /script/:name for GET
exports.script_get = function(req, res){
    pyScript.find({name: req.params.name}, function(err, script){
        if(err){
            res.send(err);
        }
        res.send(script);
    })
};

//Create endpoint /script/execute/:name for GET
exports.script_exec_get = function(req, res){
    var scriptName = req.params.script_name;
    var pyScriptsDir = './py_scripts/'
    pyScript.findOne({name: scriptName, isRegistered:true}, function(err, found){
        if(found){
            saveHistory(found.name);
            var fullPath = pyScriptsDir + found.path ;
            doExec(fullPath).then(function(fromRunpy) {
                console.log(fromRunpy.toString());
                res.end(fromRunpy);
            }).catch(function(errorFromPy){
                console.log(errorFromPy.toString());
                res.end(errorFromPy);
            });
        }else{
            console.log('Script not existing or not registered!!!');
        }
    })
    
    var doExec = function(fileNeameToExecute){
        console.log('fileNeameToExecute: ' + fileNeameToExecute);
        return new Promise(function(resolve, reject){
            const { spawn } = require('child_process');
            const pyprog = spawn('python',[fileNeameToExecute]);
            pyprog.stdout.on('data', function(data) {
                resolve(data);
            });
            pyprog.stderr.on('data', function(data){
                reject(data);
            });
        })
    }
};

//Create endpoint /script/register for POST
// body: {"name":"script_name",
// 	      "path": "file_name"
//       }
exports.script_register_post = function(req, res){
    pyScript.findOne({name: req.body.name}, function(err, foundScript){
        if(foundScript){
            doRegister(foundScript, function(err){
                if(err){
                    res.send(err);
                }else{
                    res.send('Script was registered: ' + req.body.name)
                }
            });
        }else{
            var sc = new pyScript();
            sc.name = req.body.name;
            sc.path = req.body.path;
            sc.isRegistered = true;

            sc.save(function(err){
                if(err){
                    res.send(err);
                }
                res.send('script saved to DB' + sc.name);
            });
        }
    })
};

//create endpoint for /scripts/unregister
//body: {name:script_name}
exports.script_unregister_put = function(req, res){
    pyScript.findOneAndUpdate({name: req.body.name}, {isRegistered: false}, function(err, updatedScripta){
        if(err){
            res.send(err)
        }
    })
    res.send("script unregistered: " + req.body.name);
};

var saveHistory = function(record){
    var historyRecord = new scriptHistory();
    historyRecord.name = record;
    historyRecord.timeOfExec = new Date();
    historyRecord.save(function(err){
        if(err){
            throw (err);
        }
    })
}

var doRegister = function(toRegister, cb){
    pyScript.findOneAndUpdate({name: toRegister.name}, {isRegistered: true}, function(err, updatedScripta){
        if(err){
            res.send(err)
        }
        cb();
    })
}


