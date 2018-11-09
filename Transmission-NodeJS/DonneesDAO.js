function DonneesDAO()

{

	var MongoClient = require('mongodb').MongoClient;
	var urlDb = "mongodb://localhost:27017";
	
	

	function initialiser(){
		console.log("initialiserDonneesDAO");
		
		
		//this.donnees = donnees;
	
	}

	this.enregistrerDonneesBouee = function(donneesRecu)
	{
		var bouee;
		bouee.temperatureAir = donneesRecu.temperatureAir;
		bouee.temperatureEau = donneesRecu.temperatureEau;
		bouee.directionVent = donneesRecu.directionVent;
		bouee.kilometrageVent = donneesRecu.kilometrageVent;
		bouee.hauteurMaximum = donneesRecu.hauteurMaximum;
		bouee.vagueMoyenne = donneesRecu.vagueMoyenne;
		bouee.periodeVague = donneesRecu.periodeVague;
		bouee.humidite = donneesRecu.humidite;
		bouee.rafales = donneesRecu.rafales;
		bouee.salaniteEau = donneesRecu.salaniteEau;
		bouee.densiteeEau = donneesRecu.densiteeEau;


		

		MongoClient.connect(urlDb, { useNewUrlParser: true }, function (err, db) {
			if (err) throw err;
			var dbo = db.db("Scientifique");
			var myobj = { temperatureAir: bouee.temperatureAir, 
				temperatureEau: bouee.temperatureEau, 
				directionVent: bouee.directionVent, 
				kilometrageVent: bouee.kilometrageVent, 
				hauteurMaximum: bouee.hauteurMaximum, 
				vagueMoyenne: bouee.vagueMoyenne,
				periodeVague: bouee.periodeVague,
				humidite: bouee.humidite,
				rafales: bouee.rafales,
				salaniteEau: bouee.salaniteEau,
				densiteeEau: bouee.densiteeEau
			};
			dbo.collection("bouee").insertOne(myobj, function (err, res) {
				if (err) throw err;
				console.log("1 document inserted");
				db.close();
			});
		});

	}
	
		 
		

	initialiser();
	this.bouees = [{temperature: 10.3, salanity: 0.002, difraction: 125, position: {lat: 47.2622455, long: -70.1082227 }}, {temperature: 8.45, salanity: 0.085, difraction: 105.23, position: {lat: 48.1597786, long: -66.1082227 } }];

	
}

	module.exports = DonneesDAO;
