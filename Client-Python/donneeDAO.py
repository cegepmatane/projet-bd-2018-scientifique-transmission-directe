import sqlite3
import datetime
import json

global json

def insererValeurDifferee(temperatureAir,temperatureEau,directionVent,kilometrageVent,hauteurMaximum,vagueMoyenne,periodeVague,humidite,rafales,salaniteEau,densiteeEau,longitude,latitude,idShard,date):
    
    connection = sqlite3.connect("bouee.db") #connection a la bd bouee sqlite3 sur le raspberry
    curseur = connection.cursor()
    curseur.execute('''INSERT INTO donneeBouee(temperatureAir,temperatureEau,directionVent,vitesseVent,hauteurMaximum,vagueMoyenne,periodeVague,humidite,rafales,saliniteEau,densiteeEau,longitude,latitude,idShard, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)''',(temperatureAir,temperatureEau,directionVent,kilometrageVent,hauteurMaximum,vagueMoyenne,periodeVague,humidite,rafales,salaniteEau,densiteeEau,longitude,latitude,idShard, date))

    connection.commit()
    connection.close()
        
        
def recupererValeurDifferee():

    connection = sqlite3.connect("bouee.db") #connection a la bd bouee sqlite3 sur le raspberry
    print("connecte")

    connection.row_factory = sqlite3.Row

    curseur = connection.cursor()
    resultat = curseur.execute('''SELECT temperatureAir,temperatureEau,directionVent,vitesseVent,hauteurMaximum,vagueMoyenne,periodeVague,humidite,rafales,saliniteEau,densiteeEau,longitude,latitude,idShard,date FROM donneeBouee''').fetchall()

    """for row in curseur:
    row[0] returns the first column in the query (name), row[1] returns email column.
        print('{0} : {1}, {2}, {3}, {4}, {5}, {6}, {7}, {8}, {9}, {10}, {11}, {12}, {13}, {14}'.format(row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7], row[8], row[9], row[10], row[11], row[12], row[13], row[14]))"""

    curseur.execute('''DELETE FROM donneeBouee''')
    connection.commit()
    connection.close()

    donneeJson = ""
    donneeJson = json.dumps([dict(ix) for ix in resultat] )
    print(donneeJson)

def recupererValeurDirect(jsonDonnee):
    json = jsonDonnee
    print(json)    

def envoyerValeurDirect():
    return json

    