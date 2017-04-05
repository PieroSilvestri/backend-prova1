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

var tableName = 'Users';

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
			var query = "SELECT Users.ID, Users.LastName, Users.FirstName, Users.UserName, Users.Age, "
			+"Users.DataRegistration, Users.Birthday, Users.Role, Users.Email FROM Users";

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

router.get('/:userId', function(req, res){
	
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
			console.log('Connected');

			var query = "SELECT ID, LastName, FirstName, UserName, Age, DataRegistration, Birthday, Role, Email "+
				" FROM " + tableName +" WHERE ID = " + parseInt(req.params.userId, 10);

			tempcont.query(query, function(error, rows, fields){
				tempcont.release();
				
				if(!!error){
					console.log('Error in the query');
					console.log(error);
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

/*
METHOD POST
{
	"Name": "Valerio",
  	"Surname": "Fanconi",
  	"Role": "Fisioterapista",
  	"Birthday": "1934-03-14",
  	"Email": "franco@giuliani.it",
  	"DataRegistration": "3/27/2017 2:15:47 PM",
  	"Password": "test"
}
*/

router.post('/add', function(req, res){
	//TODO AGE

	if(!req.body.Name || !req.body.Surname || !req.body.Role || !req.body.Birthday || !req.body.Email || !req.body.DataRegistration || !req.body.Password ){
		return res.status(400).json({
			message: 'Missing some fields.',
			success: false
		});
	}

	connection.getConnection(function(error, tempcont){
		if(!!error){
			//empcont.release();
			console.log('Error');
		}else{
			console.log('Connected');

			var query = "INSERT INTO " + tableName + " (ID, LastName, FirstName, UserName, Password, Age, DataRegistration, Birthday, Role, Email) "
			+"VALUES (NULL , '"+req.body.Surname+"', '"
				+req.body.Name+"', '"+req.body.Name + req.body.Surname+"', '"
				+req.body.Password+"', 23, '"
				+req.body.DataRegistration+"', '"+req.body.Birthday+"', '"
				+req.body.Role+"', '"+req.body.Email+"');"

			tempcont.query(query, function(error, rows, fields){
								tempcont.release();
								if(!!error){
									console.log('Error in the query');
									console.log(error);
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

router.post('/add/images', function(req, res){
	//TODO AGE
	tableName = "Images";
	if(!req.body.ID || !req.body.faceId_1 || !req.body.faceId_2){
		return res.status(400).json({
			message: 'Missing some fields.',
			success: false
		});
	}

	connection.getConnection(function(error, tempcont){
		if(!!error){
			//empcont.release();
			console.log('Error');
		}else{
			console.log('Connected');

			var query = "INSERT INTO " + tableName + " (ID_User, PersistedFaceId) "
			+"VALUES ('"+parseInt(req.body.ID, 10)+"', '"+req.body.faceId_1+"');";

			var query2 = "INSERT INTO " + tableName + " (ID_User, PersistedFaceId) "
			+"VALUES ('"+parseInt(req.body.ID, 10)+"', '"+req.body.faceId_2+"');";

			tempcont.query(query, function(error1, rows1, fields){
								tempcont.release();
								if(!!error1){
									console.log('Error in the query');
									console.log(error1);
									return res.status(400).json({
										success: false,
										message: "Valori non trovati query1."
									})
								}else{
									if(rows1.length == 0){
										return res.status(401).json({
											success: false,
											message: "Valori non trovati query1."
										})
									}else{
										tempcont.query(query2, function(error2, rows2, fields2){
											//tempcont.release();
											if(!!error2){
												console.log('Error in the query');
												console.log(error2);
												return res.status(400).json({
													success: false,
													message: "Valori non trovati query2."
												})
											}else{
												if(rows2.length == 0){
													return res.status(401).json({
														success: false,
														message: "Valori non trovati query2."
													})
												}
												res.status(200).json({
													success: true,
													body: {
														rows1: rows1,
														rows2: rows2
													}
													});
											}
										})
									}
								}
			})
		}
	});
});

// Login
router.post('/login', function(req, res){
	//TODO AGE

	if(!req.body.faceId){
		return res.status(400).json({
			message: 'Missing some fields.',
			success: false
		});
	}

	connection.getConnection(function(error, tempcont){
		if(!!error){
			//empcont.release();
			console.log('Error');
		}else{
			console.log('Connected');

			var query = "SELECT Users.ID, LastName, FirstName, UserName, Age, DataRegistration, Birthday, Role, Email " 
				+ "FROM Users LEFT JOIN Images ON Users.ID = Images.ID_User WHERE Images.PersistedFaceId = '"+req.body.faceId+"';";

			tempcont.query(query, function(error, rows, fields){
								tempcont.release();
								if(!!error){
									console.log('Error in the query');
									console.log(error);
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