import simplejson as json
from socketIO_client_nexus import SocketIO, LoggingNamespace

def on_connect(msg):
	print(json.loads(msg))

connexion = SocketIO('vps202433.vps.ovh.ca', 8080, LoggingNamespace)
#print('hello')
connexion.on('salutation', on_connect)
connexion.emit('aaa', json.dumps('c\'est moi l\'homme ici'))
connexion.wait()
