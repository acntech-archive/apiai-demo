
var http = require('http');
var path = require('path');

var express = require('express');
var bodyParser = require('body-parser')

var app = express();
var server = http.createServer(app);

app.use(bodyParser.json())

app.post('/webhook', function(req, res) {
  res.status(200).send();
});

app.get('/', function(req, res) {
  res.send('Welcome to the API.ai demo API');
});


server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
});


