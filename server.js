
var http = require('http');
var path = require('path');

var express = require('express');
var bodyParser = require('body-parser')

var app = express();
var server = http.createServer(app);

app.use(bodyParser.json())

app.post('/webhook', function(req, res) {
  var intent = req.body.result.metadata.intentName;
  var parameters = req.body.result.parameters;
  
  console.log("Got request: " + JSON.stringify(req.body));
  
  switch(intent) {
    case "information":
        res.send(getInformation(parameters));
        break;
    default:
        res.status(500).send();
  }
  res.status(500).send();
});


app.get('/', function(req, res) {
  res.send('Welcome to the API.ai demo API');
});


server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
});

function getInformation(parameters) {
  var text = "";

  var platform = parameters.platform;
  
  if (platform) {
    switch(platform) {
      case "technology":
        text = "Accenture Technology focuses on technology solutions, implementation, delivery, and research & development, including its Technology Labs for emerging technologies.";
        break;
      case "digital":
        text = "Accenture Digital provides digital marketing, analytics and mobility services.";
        break;
      case "operations":
        text = "Accenture Operations focuses on an \"as-a-service\" model of service delivery. This includes business process outsourcing, IT services, cloud services, managed operations, security and infrastructure services.";
        break;
      case "strategy":
        text = "Accenture Strategy provides business strategy, technology strategy and operations strategy services.";
        break;
      case "consulting":
        text = "Accenture Consulting provides technology, business and management consulting.";
        break;
      default:
        text = "I'm sorry. I don't understand what you are looking for";
    }
  } else {
    text = "The five Growth Platforms of Accenture are Technology, Digital, Operations, Strategy and Consulting";
  }

  var response = {
    "speech": text,
    "displayText": text,
    "source": "API.ai bot backend"
  }
  
  return response;
}
