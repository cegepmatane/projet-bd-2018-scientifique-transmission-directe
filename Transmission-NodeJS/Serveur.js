var http = require('http');
var io = require('socket.io');

function init() {
	var serveur = http.createServer(function (requete, reponse) { 
		reponse.writeHead(200);
		reponse.end('Allo les clients');
}).listen(8080);

	console.log("Le serveur est en ligne !");
	
	var priseEntreeSortie = io.listen(serveur);
	priseEntreeSortie.on('connection', gererConnexion);
}

function gererConnexion(connexion) {
	console.log("Une personne est connectee");
	connexion.emit('salutation', JSON.stringify("Bonjour !"));
}

init();
