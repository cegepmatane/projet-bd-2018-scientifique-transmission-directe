function BoueeDAO(emitteurBoueeDAO) {
	const mongo = require('mongodb');
	const MongoClient = mongo.MongoClient;

	const { urlBaseDeDonnees, NOM_BASE_DE_DONNEES, NOM_COLLECTION } = require('./InformationsMongoDB');

	function initialiser() {
		console.log("initialiserDonneesDAO");
	}

	// Ajout basique d'une bouees dans la bd mongodb
	this.ajouter = function (donneesRecu) {
		console.log("BoueeDAO.ajouter() " + donneesRecu);

		MongoClient.connect(urlBaseDeDonnees, { useNewUrlParser: true }, function (erreur, connexionBaseDeDonnees) {
			if (erreur)
				throw erreur;

			var baseDeDonnees = connexionBaseDeDonnees.db(NOM_BASE_DE_DONNEES);
			baseDeDonnees.collection(NOM_COLLECTION).insertOne(donneesRecu, function (erreur, reponse) {
				if (erreur)
					throw erreur;

				console.log("1 document inseré : " + reponse);
				connexionBaseDeDonnees.close();
			});
		});
	}

	// Recupere seulement lid et la position de toutes les bouees de la BD mongodb
	// connexionClient sert a renvoyer le resultat de la requete a la bonne connexion
	// Un evenement est leve quand la requete est terminee puisque la requete est async
	this.lister = function (connexionClient) {
		MongoClient.connect(urlBaseDeDonnees, { useNewUrlParser: true }, function (erreur, connexionBaseDeDonnees) {
			if (erreur)
				throw erreur;

			var baseDeDonnees = connexionBaseDeDonnees.db(NOM_BASE_DE_DONNEES);
			baseDeDonnees.collection(NOM_COLLECTION).find({}).project({_id: 1, longitude: 1, latitude: 1}).toArray(function (erreur, resultat) {
				if (erreur)
					throw erreur;

				connexionBaseDeDonnees.close();
				emitteurBoueeDAO.emit('donnees-pour-marqueurs-prete', connexionClient, resultat);
			});
		});
	}

	// Recuperer toutes les infos d'une bouee selon son id
	// connexionClient sert a renvoyer le resultat de la requete a la bonne connexion
	// Un evenement est leve quand la requete est terminee puisque la requete est async
	this.recuperer = function (id, connexionClient) {
		MongoClient.connect(urlBaseDeDonnees, { useNewUrlParser: true }, function (erreur, connexionBaseDeDonnees) {
			if (erreur)
				throw erreur;

			var baseDeDonnees = connexionBaseDeDonnees.db(NOM_BASE_DE_DONNEES);
			baseDeDonnees.collection(NOM_COLLECTION).find({_id: new mongo.ObjectID(id)}).toArray(function (erreur, resultat) {
				if (erreur)
					throw erreur;

				connexionBaseDeDonnees.close();
				emitteurBoueeDAO.emit('donnees-bouee-prete', connexionClient, resultat[0]);
			});
		});
	}

	initialiser();
}

module.exports = BoueeDAO;
