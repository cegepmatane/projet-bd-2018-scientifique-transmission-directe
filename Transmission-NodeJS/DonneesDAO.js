 function DonneesDAO(){

	var MongoClient = require('mongodb').MongoClient;
	var urlDb = "mongodb://localhost:27017";

	function initialiser(){
		console.log("initialiserDonneesDAO");
		//this.donnees = donnees;
	
	}

	this.enregistrerDonneesBouee = function(donneesRecu)
	{
		console.log(donneesRecu);
		temperatureAir = donneesRecu.temperatureAir;
		temperatureEau = donneesRecu.temperatureEau;
		directionVent = donneesRecu.directionVent;
		kilometrageVent = donneesRecu.kilometrageVent;
		hauteurMaximum = donneesRecu.hauteurMaximum;
		vagueMoyenne = donneesRecu.vagueMoyenne;
		periodeVague = donneesRecu.periodeVague;
		humidite = donneesRecu.humidite;
		rafales = donneesRecu.rafales;
		salaniteEau = donneesRecu.salaniteEau;
		densiteeEau = donneesRecu.densiteeEau;


		

		MongoClient.connect(urlDb, { useNewUrlParser: true }, function (err, db) {
			if (err) throw err;
			var dbo = db.db("Scientifique");
			var myobj = { temperatureAir: temperatureAir, 
				temperatureEau: temperatureEau, 
				directionVent: directionVent, 
				kilometrageVent: kilometrageVent, 
				hauteurMaximum: hauteurMaximum, 
				vagueMoyenne: vagueMoyenne,
				periodeVague: periodeVague,
				humidite: humidite,
				rafales: rafales,
				salaniteEau: salaniteEau,
				densiteeEau: densiteeEau
			};
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

}
module.exports = DonneesDAO;



