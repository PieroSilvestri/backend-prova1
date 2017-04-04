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

var tableName = 'Reports';

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

router.post('/add', function(req, res){
	//TODO AGE
	if(!req.body.faces || !req.body.emotions || !req.body.id_user || !req.body.id_list){
		return res.status(400).json({
			message: 'Missing some fields.',
			success: false
		});
	}

	var faces = req.body.faces;
	var emotions = req.body.emotions;
	var id_user = req.body.id_user;
	var id_list = req.body.id_list;
	var emotion = req.body.emotion;
	var dateCreated = req.body.dateCreated;

	connection.getConnection(function(error, tempcont){
		if(!!error){
			//empcont.release();
			console.log('Error');
		}else{
			console.log('Connected');

			var tags;
			var body;
			var results = [];

			tempcont.release();

			var righe = rows;

			async.forEachOfSeries(faces, function(face, i, callback){

				var query = "INSERT INTO " + tableName + " (Gender, Age, Anger_value, Contempt_valiue, Disgust_value, Fear_value, Happiness_value, "
				+"Neutral_value, Sadness_value, Surprise_value, ID_User, ID_List, Emotion, DateCreate) "
				+"VALUES ('"+face.gender+"', "+face.age+", "
				+parseFloat(emotions[i].anger)+", "+parseFloat(emotions[i].contempt)+", "+parseFloat(emotions[i].disgust)+", "+parseFloat(emotions[i].fear)+", "+parseFloat(emotions[i].happiness)+", "
				+parseFloat(emotions[i].neutral)+", "+parseFloat(emotions[i].sadness)+", "+parseFloat(emotions[i].surprise)+", "
				+parseInt(id_user, 10)+", "+parseInt(id_list, 10)+", '"+emotion+"', '"+dateCreated+"');";

					tempCont.query(query, function(error, rows, fields){
						if(!!error){
							console.log("Error in the queryTags");
							console.log(error)
						}else{
							if(rows1.length == 0){
								body = (righe[i]);
								tags = 0;
							}else{
								body = (righe[i]);
								tags = (rows);
							}
						}

						results.push({body: body, tags: tags});

						callback();
					});
				}, function done(){

					console.log("finito")

					res.status(200).json({
						success: true,
						results: results
					});
				});
		}
	});
});

	module.exports = router;