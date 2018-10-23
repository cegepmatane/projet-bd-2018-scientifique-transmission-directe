from pymongo import MongoClient


def insererValeur(json):
    try : 
        conn = MongoClient() #connection a la base mongodb
        print("connected")

        db = conn.scientifique #selection de la base de donnee
        collection = db.donneeBouee #selection de la collection
        print("get collection")

        #insert json
        result = collection.insert(json) #insertion du json
        print("inserted ")

    except:
        print("error")
        
        
def recupererValeur():
    try : 
        conn = MongoClient()
        print("connected")

        db = conn.scientifique #selection de la base de donnee
        collection = db.donneeBouee #selection de la collection

        curseur = collection.find() #recuperation de toutes les donnees de la collection
        #collection.delete_many()

        resultString="" 
        for enregistrement in curseur :
            resultString+=str(enregistrement) #formatage des donnees
            
        #curseur.close()
            
        return str(resultString)
        
    except Exception as e:
    
        return e

def supprimerDonnee():
        conn = MongoClient()
        print("connected")
        db = conn.scientifique #selection de la base de donnee
        collection = db.donneeBouee #selection de la collection
    
        collection.drop() #suppression des donnees en local
