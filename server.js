var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var port = 3000;
var script = require('./routes/script');
var scriptHistory = require('./routes/history');

var config = require('config');
mongoose.connect(config.DBHost);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use('/scripts', script);
app.use('/history', scriptHistory);

app.listen(port, () => console.log('listening on port: ' + port));