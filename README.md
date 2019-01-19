# Installation du backend

Voici les étapes pour installer le back-end

## 1. Installation de maria db
Via ce [lien](https://downloads.mariadb.org/mariadb/10.3.12/), télécharger et installer Maria DB sur votre ordinateur.
Voici le [lien](https://dev.mysql.com/downloads/workbench/) vers le GUI pour mysql
Le mot de passe de l'utilisateur root sera : **gti525h2019analytics**
Utiliser les caractères utf8 par défaut

Vous devez créer une base de données qui se nomme **analytics**

## 2. Installation de vscode, git, postman et npm.

Une recherche google devrait faire l'affaire :)

## 3. Installation du backend

1. Clonez le répertoire git sur votre ordinateur.
2. Ouvez l'invite de commande présent dans vscode (ctrl+è) ou via le menu view
3. Assurez-vous d'avoir npm déjà installé.  La commande `npm -v` devrait vous donner la version installée de npm.
4. Exécutez la commande suivante

```
npm install --global --production windows-build-tools //En mode administrateur
npm install -g grunt typescript ts-node
npm install
```
Effectuer le test via la commande grunt test.  Les tests devraient passer.

Assurez-vous d'avoir démarré une instance de votre base de données.

Pour démarrer le serveur, faites npm run-script dev.

---

## Installation du front-end

---

# Les packages NPM
Sont tous dans package.json.  Les packages précédés de @ permettent d'avoir la définition des classes en type script.
### Grunt
Grunt permet de rouler des scripts avec différntes options.  Ici, seul grunt test est utilisé.
### Chai et Mocha
Servent à effecture les tests
### typeorm
Permet de facilement créer des modèles en liens avec la base de données.  Toute la documentation est [ici](https://www.npmjs.com/package/typeorm)