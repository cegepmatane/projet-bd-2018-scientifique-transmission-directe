import simplejson as json
from socketIO_client_nexus import SocketIO, LoggingNamespace
import donneeDAO

def lors_connection(msg):
	print(json.loads(msg))

def on_send():
    print("data sent")

connection = SocketIO('vps202433.vps.ovh.ca', 8080, LoggingNamespace)
#connection = SocketIO('vps202845.vps.ovh.ca', 8080, LoggingNamespace)
connection.on('salutation', lors_connection)
connection.on('donnee_recu',on_send)
while True:
    stringMongoDB = donneeDAO.envoyerValeurDirect()
    #stringAEnvoyer = "{"+json.dumps(stringMongoDB)+"}" #transformation du string a envoyer en json
    #stringAEnvoyer = json.loads(stringMongoDB) #transformation du string a envoyer en json
    stringAEnvoyer = stringMongoDB #transformation du string a envoyer en json

    print(stringAEnvoyer)

    connection.emit('aaa', str(stringMongoDB)) #envoie du json

    print("sent")

    connection.wait(0.2)
