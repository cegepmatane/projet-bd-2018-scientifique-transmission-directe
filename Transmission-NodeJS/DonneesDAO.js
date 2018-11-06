 this.DonneesDAO = function(){


	function initialiser(){
		console.log("initialiserDonneesDAO");
		//this.donnees = donnees;
		

	}
	this.EnregistrerDonneesBouee = function(donneesRecu)
	{
		var bouee;
		bouee.temperature = donneesRecu.temperature;
		bouee.salanity = donneesRecu.salanity;
		bouee.difraction = donneesRecu.difraction;
		bouee.position = donneesRecu.position
		enregistrerDonnees;

	}


	function enregistrerDonnees(){
		console.log("enregistrerDonnees");
		console.log(donnees.temperature);

	}
	this.simulerBouees = function()
	{
		var bouees = [{temperature: 10.3, salanity: 0.002, difraction: 125, position: {lat: 47.2622455, long: -70.1082227 }}, {temperature: 8.45, salanity: 0.085, difraction: 105.23, position: {lat: 48.1597786, long: -66.1082227 } }]
	}

	initialiser();

};


