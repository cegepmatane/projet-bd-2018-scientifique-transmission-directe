import simplejson as json
from socketIO_client_nexus import SocketIO, LoggingNamespace
import donneeDAO

def on_connect(msg):
	print(json.loads(msg))

def on_send():
    print("data sent")



connexion = SocketIO('vps202433.vps.ovh.ca', 8080, LoggingNamespace)
#connexion = SocketIO('vps202845.vps.ovh.ca', 8080, LoggingNamespace)
connexion.on('salutation', on_connect)
while True:
    stringMongoDB = donneeDAO.recupererValeur()
    stringAEnvoyer = json.dumps(stringMongoDB)
    print(stringAEnvoyer)
    connexion.emit('aaa', stringMongoDB)
    #connexion.emit('aaa', StringAEnvoyer)
    print("sent")
    connexion.wait(0.2)


