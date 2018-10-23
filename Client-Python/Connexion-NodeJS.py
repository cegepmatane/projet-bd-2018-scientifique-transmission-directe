import simplejson as json
from socketIO_client_nexus import SocketIO, LoggingNamespace
import donneeDAO

def lors_connection(msg):
	print(json.loads(msg))

def on_send():
    print("data sent")

def lors_donnee_recu():
    donneeDAO.supprimerDonnees()

connection = SocketIO('vps202433.vps.ovh.ca', 8080, LoggingNamespace)
#connection = SocketIO('vps202845.vps.ovh.ca', 8080, LoggingNamespace)
connection.on('salutation', lors_connection)
connection.on('donnee_recu',lors_donnee_recu)
while True:
    stringMongoDB = donneeDAO.recupererValeur()
    #stringAEnvoyer = "{"+json.dumps(stringMongoDB)+"}" #transformation du string a envoyer en json
    stringAEnvoyer = "{"+json.dumps(stringMongoDB)+"}" #transformation du string a envoyer en json

    print(stringAEnvoyer)

    connection.emit('aaa', stringMongoDB) #envoie du json

    print("sent")

    connection.wait(0.2)
