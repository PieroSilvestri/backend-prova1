var express = require('express'); 
var app = express();
var bodyParser = require('body-parser'); 
var mysql = require('mysql');

app.set('port', (process.env.PORT || 5000));  

app.use(bodyParser.json()); 

app.use(function(req, res, next){
	res.header('Access-Control-Allow-Origin', "*");
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
}) 

app.use(require('./controllers'));

app.listen(app.get('port'), function(){
	console.log('server is running')
});