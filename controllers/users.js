var express = require('express')
, router = express.Router();
var mysql = require('mysql');
var async = require('async');

var connection = mysql.createPool({
	host: 'prohosting3.netsons.net',
	port: '3306',
	user: 'mjhnxzbg_test',
	password: '@Password1.',
	database: 'mjhnxzbg_test1'
});

var tableName = 'mySampleTable';

router.get('/', function(req, res){

		connection.getConnection(function(error, tempcont){
		if(error){
			//tempcont.release();
			console.log('Error');
			console.log(error);
		}else{
			console.log('Connected');
			var query = "SELECT * FROM " + tableName;

			tempcont.query(query, function(error, rows, fields){

				tempcont.release();

				if(!!error){
					console.log('Error in the query');
					console.log(error)
				}else{
					if(rows.length == 0){
						return res.json({
							message: "Valori non trovati",
							error: true
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

router.get('/:userId', function(req, res){
	
		connection.getConnection(function(error, tempcont){
		if(error){
			//tempcont.release();
			console.log('Error');
			console.log(error);
		}else{
			console.log('Connected');
			tempcont.query("SELECT * FROM " + tableName +" WHERE ID = " + parseInt(req.params.userId, 10), function(error, rows, fields){
				tempcont.release();
				
				if(!!error){
					console.log('Error in the query');
					console.log(error)
				}else{
					if(rows.length == 0){
						return res.json({
							message: "Valori non trovati",
							error: true
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


router.post('/add', function(req, res){

	if(!req.body.name){
		return res.json({
			message: 'Missing user name.',
			error: true
		});
	}else{
		console.log("Name: " + req.body.name);
	}

	connection.getConnection(function(error, tempcont){
		if(!!error){
			t//empcont.release();
			console.log('Error');
		}else{
			console.log('Connected');

			var query = "INSERT INTO  `mjhnxzbg_test1`.`mySampleTable` (`ID` ,`NAME`) VALUES (NULL ,  '"+ req.body.name+"');"

			tempcont.query(query, function(error, rows, fields){
								tempcont.release();
								if(!!error){
									console.log('Error in the query');
									console.log(error);
								}else{
									if(rows.length == 0){
										return res.json({
											message: "Utente non trovato",
											error: true
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