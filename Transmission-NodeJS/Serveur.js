const http = require('http');
const socketio = require('socket.io');
const BoueeDAO = require('./accesseur/BoueeDAO.js');
const EventEmitter = require('events');

var boueeDAO;
var emitteurBoueeDAO;

function initialiser() {
	class MonEmitteur extends EventEmitter { }
	emitteurBoueeDAO = new MonEmitteur();

	var serveur = http.createServer(function (requete, reponse) { }).listen(8080);

	boueeDAO = new BoueeDAO(emitteurBoueeDAO);

	var priseEntreeSortie = socketio.listen(serveur);
	console.log("Le serveur est en ligne !");

	// Gestion d'evenements socketio de base pas trop important
	priseEntreeSortie.on('connection', gererConnexion);
	priseEntreeSortie.on('disconnect', gererDeconnexion);

	// Gestion des requetes asynchrones du BoueeDAO
	emitteurBoueeDAO.on('donnees-pour-marqueurs-prete', envoyerDonneesPourMarqueurs);
	emitteurBoueeDAO.on('donnees-bouee-prete', envoyerDonneeBouee);
}

function gererConnexion(connexion) {
	console.log("Une personne est connectee");
	// Inutile sert seulement a verifier la connexion
	connexion.emit('salutation', JSON.stringify("Bonjour !"));

	// Requete recu par le(s) bouee(s)
	connexion.on('emission-donnees-bouee', recupererDonneesCapteur);

	// Requete de l'application electron
	connexion.on('requete-donnees-marqueurs', demanderDonneesPourMarqueurs);
	connexion.on('requete-donnees-bouee', demanderDonnees);
}

// Les donnees recu par les bouees en direct ou en differees sont ajouter a la BD mongodb
function recupererDonneesCapteur(donnees) {
	listeDonnee = JSON.parse(donnees);

	lireDonnes.array.forEach(element => {
		console.log(element.temperatureAir);
		boueeDAO.ajouter(element);
	});
}

// Une requete pour les infos afin dafficher les marqueurs dans l'app electron
function demanderDonneesPourMarqueurs(requete) {
	boueeDAO.lister(this);
}

// Renvoie les donnees necessaire pour les marqueurs de lapp electron au demandant
function envoyerDonneesPourMarqueurs(connexionClient, resultatRequete) {
	// console.log(resultatRequete);
	connexionClient.emit('donnees-marqueurs-bouee', JSON.stringify(resultatRequete));
}

// Un requete pour recuperer toute les infos dune bouee a lapp electron
function demanderDonnees(requete) {
	boueeDAO.recuperer(JSON.parse(requete), this);
}

// Renvoi les donnees des bouees un fois la requete async est terminee
function envoyerDonneeBouee(connexionClient, resultatRequete) {
	// console.log(resultatRequete);
	connexionClient.emit('donnees-bouee', JSON.stringify(resultatRequete));
}

// Sert juste a verifier si la connexion est coupe avec le client
function gererDeconnexion() {
	console.log("Une personne s'est deconnectee");
	this.emit('adieu', JSON.stringify("Farewell my friend !"));
}

initialiser();