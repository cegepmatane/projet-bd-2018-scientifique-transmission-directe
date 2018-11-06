var http = require('http');
var io = require('socket.io');
DonneesDAO = require('./DonneesDAO.js');
var donneesDao;

function init() {
	donneesDao = new DonneesDAO(); 
	var serveur = http.createServer(function (requete, reponse) {
		//reponse.writeHead(200);
		//reponse.end('Valentin :@');
	}).listen(8080);

	console.log("Le serveur est en ligne !");

	var priseEntreeSortie = io.listen(serveur);
	priseEntreeSortie.on('connection', gererConnexion);
	priseEntreeSortie.on('disconnect', gererDeconnexion);
}

function gererConnexion(connexion) {
	console.log("Une personne est connectee");
	connexion.emit('salutation', JSON.stringify("Bonjour !"));
	connexion.on('aaa', recupererDonneesCapteur);
	connexion.on('envoyer-donnee', envoyerDonnee);
	connexion.on('envoyer-position', envoyerPosition);
}

function recupererDonneesCapteur(connexion){
	listeDonnees = JSON.parse(connexion);
	for(var i = 0; i< listeDonnees.length; i++)
        {
			console.log(listeDonnees[i].temperatureEau);
			//donneesDao.enregistrerDonneesBouee(listeDonnees[i]);
					
        }
}

function envoyerDonnee(socket)
{
	this.emit('donneeBouee', JSON.stringify("Les donnees des bouer seront ici!"));
}
function envoyerPosition(socket)
{
	var positions;
	var i;
	bouees = donneesDao.simulerBouees();
	while (bouees.length =! i){
	positions[i] = bouees[i].position;
	}
	
	this.emit('positionBouee', positions);
}

function gererDeconnexion(connexion){
	console.log("Une personne s'est deconnectee");
	connexion.emit('adieu', JSON.stringify("Farewell my friend !"));
}

/*function enregisterDonnees() {
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
*/

function lireDonnes(){
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
//enregisterDonnees();
