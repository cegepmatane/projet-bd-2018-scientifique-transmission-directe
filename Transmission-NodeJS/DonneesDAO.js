 this.DonneesDAO = function(){

	var MongoClient = require('mongodb').MongoClient;
	var urlDb = "mongodb://localhost:27017";

	function initialiser(){
		console.log("initialiserDonneesDAO");
		//this.donnees = donnees;
	
	}

	this.enregistrerDonneesBouee = function(donneesRecu)
	{
		var bouee;
		bouee.temperature = donneesRecu.temperature;
		bouee.salanity = donneesRecu.salanity;
		bouee.difraction = donneesRecu.difraction;
		bouee.position = donneesRecu.position;
		MongoClient.connect(urlDb, { useNewUrlParser: true }, function (err, db) {
			if (err) throw err;
			var dbo = db.db("Scientifique");
			var myobj = { temperature: bouee.temperature, salanity: bouee.salanity, difraction:bouee.difraction, latitude:bouee.position.lat, longitude:bouee.position.long };
			dbo.collection("bouee").insertOne(myobj, function (err, res) {
				if (err) throw err;
				console.log("1 document inserted");
				db.close();
			});
		});

	}
	this.simulerBouees = function()
	{
		var bouees = [{temperature: 10.3, salanity: 0.002, difraction: 125, position: {lat: 47.2622455, long: -70.1082227 }}, {temperature: 8.45, salanity: 0.085, difraction: 105.23, position: {lat: 48.1597786, long: -66.1082227 } }]
		return bouees;
	}

	initialiser();

};


