var mongoose = require('mongoose');

var ScriptSchema = new mongoose.Schema({
    name: String,
    path: String,
    isRegistered: Boolean
});

module.exports = mongoose.model('Script', ScriptSchema);