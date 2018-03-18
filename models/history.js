var mongoose = require('mongoose');

var HistoryScehma = new mongoose.Schema({
    name: String,
    timeOfExec: Date
});

module.exports = mongoose.model('ScriptHistory', HistoryScehma);