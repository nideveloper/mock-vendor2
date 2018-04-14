var express = require('express');
var nconf = require('nconf');
var mysql = require('mysql');
var app = express();

nconf.argv()
       .env()
       .file({ file: 'config.json' });

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function (req, res) {
    res.send("This is a dummy Penton service");
});

app.get('/penton/load', function (req, res) {
    res.send({"status": "loaded", "id": 3});
});

app.get('/penton/yearBusinessStarted/:id', function (req, res) {
    var recordID = req.params.id;
    console.log('loading penton year business started for user '+recordID);

    res.send({"value": 2004, "location": "penton/yearBusinessStarted", "vendor": "penton"});
});

app.get('/penton/numEmployees/:id', function (req, res) {
    var recordID = req.params.id;
    console.log('loading numEmployees for user '+recordID);

    res.send({"value": 5, "location": "penton/numEmployees", "vendor": "verisk"});
});

var server = app.listen(process.env.PORT || 4000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Proxy listening at http://%s:%s', host, port);
});