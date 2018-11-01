function DonneesDAO(donneesRecu){

	donnees = this;
	
	this.id;
	this.temperature;
	this.salanity;
	this.difraction;

	function initialiser(){
		console.log("initialiserDonneesDAO");
		//this.donnees = donnees;
		donnees.temperature = donneesRecu.temperature;
		donnees.salanity = donneesRecu.salanity;
		donnees.difraction = donneesRecu.difraction;

	}


	this.enregistrerDonnees = function(){
		console.log("enregistrerDonnees");
		console.log(donnees.temperature);

	}

	initialiser();

}


module.exports = DonneesDAO;
