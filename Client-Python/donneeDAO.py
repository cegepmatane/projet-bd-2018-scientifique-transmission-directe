from pymongo import MongoClient
from pprint import pprint
import json

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

        curseur = collection.find({}, {'_id': False}) #recuperation de toutes les donnees de la collection
        resultString="" 
        l = list(curseur)
        jsonData = json.dumps(l)
        print("jsonData")
        print(jsonData)
        
        #curseurDestruction = collection.find()
        #collection.delete_many(curseurDestruction)
        supprimerDonnee()

        return jsonData
        
    except Exception as e:
        print(e)
        return e

def supprimerDonnee():
        conn = MongoClient()
        print("drop")
        db = conn.scientifique #selection de la base de donnee
        collection = db.donneeBouee #selection de la collection
    
        collection.drop() #suppression des donnees en local
