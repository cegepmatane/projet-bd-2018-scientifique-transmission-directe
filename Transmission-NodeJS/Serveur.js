var http = require('http');
var io = require('socket.io');
var MongoClient = require('mongodb').MongoClient;
var urlDb = "mongodb://localhost:27017"

function init() {
	var serveur = http.createServer(function (requete, reponse) {
		reponse.writeHead(200);
		reponse.end('Valentin :@');
	}).listen(5000);

	console.log("Le serveur est en ligne !");

	var priseEntreeSortie = io.listen(serveur);
	priseEntreeSortie.on('connection', gererConnexion);
	
}

function gererConnexion(connexion) {
	console.log("Une personne est connectee");
	connexion.emit('salutation', JSON.stringify("Bonjour !"));
}

function enregisterDonnees() {
	MongoClient.connect(urlDb, { useNewUrlParser: true }, function (err, db) {

		if (err) throw err;
		var dbo = db.db("test");
		var myobj = { name: "Company Inc", address: "Highway 37" };
		dbo.collection("customers").insertOne(myobj, function (err, res) {
			if (err) throw err;
			console.log("1 document inserted");
			db.close();
		})
	})
	lireDonnes();
}
function lireDonnes()
{
	MongoClient.connect(urlDb, { useNewUrlParser: true }, function(err, db) {
		if (err) throw err;
		var dbo = db.db("test");
		var query = { address: "Highway 37" };
		dbo.collection("customers").find(query).toArray(function(err, result) {
		  if (err) throw err;
		  console.log(result);
		  db.close();
		});
	  });
}


init();
