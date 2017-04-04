var express = require('express')
, router = express.Router();
var mysql = require('mysql');
var async = require('async');

var connection = mysql.createPool({
	host: 'prohosting3.netsons.net',
	port: '3306',
	user: 'mjhnxzbg_test',
	password: '@Password1.',
	database: 'mjhnxzbg_imageRecognizer_v1'
});

var tableName = 'Lists';

router.get('/', function(req, res){

	connection.getConnection(function(error, tempcont){
		if(error){
			//tempcont.release();
			console.log('Error');
			console.log(error);
			return res.status(400).json({
				success: false,
				message: "Connessione errata."
			})
		}else{
			console.log('Connected!');
			var query = "SELECT * FROM " + tableName;

			tempcont.query(query, function(error, rows, fields){
				tempcont.release();

				if(!!error){
					console.log('Error in the query');
					console.log(error)
					return res.status(400).json({
						success: false,
						message: "Valori non trovati."
					})
				}else{
					if(rows.length == 0){
						return res.status(401).json({
							success: false,
							message: "Valori non trovati."
						})
					}
					res.status(200).json({
						success: true,
						body: rows
					});
				}
			})
		}
	});
});

router.get('/user/:userId', function(req, res){

	connection.getConnection(function(error, tempcont){
		if(error){
			//tempcont.release();
			console.log('Error');
			console.log(error);
			return res.status(400).json({
				success: false,
				message: "Connessione errata."
			})
		}else{
			console.log('Connected!');
			var query = "SELECT * FROM " + tableName + " WHERE ID_User = " +parseInt(req.params.userId, 10) + ";";

			tempcont.query(query, function(error, rows, fields){
				tempcont.release();

				if(!!error){
					console.log('Error in the query');
					console.log(error)
					return res.status(400).json({
						success: false,
						message: "Valori non trovati."
					})
				}else{
					if(rows.length == 0){
						return res.status(401).json({
							success: false,
							message: "Valori non trovati."
						})
					}
					res.status(200).json({
						success: true,
						body: rows
					});
				}
			})
		}
	});
});

module.exports = router;