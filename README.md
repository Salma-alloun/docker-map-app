# 🗺️ Map Traffic Sensors - California

Application web interactive pour visualiser les capteurs de trafic routier sur le réseau autoroutier .

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Docker](https://img.shields.io/badge/docker-ready-brightgreen)
![MongoDB](https://img.shields.io/badge/MongoDB-integrated-green)
![Node.js](https://img.shields.io/badge/Node.js-20+-success)

## 📋 Table des matières
- [Fonctionnalités](#-fonctionnalités)
- [Capture d'écran](#-capture-décran)
- [Technologies utilisées](#-technologies-utilisées)
- [Prérequis](#-prérequis)
- [Installation](#-installation)
- [Utilisation](#-utilisation)
- [Structure du projet](#-structure-du-projet)
- [API Endpoints](#-api-endpoints)
- [Déploiement](#-déploiement)
- [Contribuer](#-contribuer)
- [Licence](#-licence)

## ✨ Fonctionnalités

- 🗺️ **Carte interactive** avec Leaflet et OpenStreetMap
- 📍 **Visualisation des capteurs** sous forme de points rouges
- 🔍 **Filtrage par autoroute** (US 101, I-280, CA-85, etc.)
- ℹ️ **Informations détaillées** au clic sur chaque capteur
- 🍃 **Base de données MongoDB** pour le stockage des données
- 🐳 **Conteneurisation Docker** pour un déploiement facile
- 📊 **Statistiques en temps réel** du nombre de capteurs affichés



## 🛠️ Technologies utilisées

### Frontend
- **HTML5 / CSS3** - Structure et style
- **JavaScript** - Logique applicative
- **Leaflet** - Bibliothèque de cartographie interactive
- **OpenStreetMap** - Fonds de carte

### Backend
- **Node.js** - Environnement d'exécution
- **Express** - Framework web
- **MongoDB** - Base de données NoSQL
- **csv-parser** - Parsing des fichiers CSV

### DevOps
- **Docker** - Conteneurisation
- **Docker Compose** - Orchestration des conteneurs

## 📦 Prérequis

- **Docker** et **Docker Compose** installés
- Ou **Node.js** (v20+) et **MongoDB** pour une exécution locale
- Git pour cloner le repository

# 🚀 Installation et lancement du projet Map Traffic Sensors

## 📋 Prérequis

* Docker installé → Docker
* (Optionnel) Docker Desktop pour interface graphique

---

## 🧱 1. Créer un réseau Docker

Créer un réseau pour permettre la communication entre les conteneurs :

```bash
docker network create my-network
```

---

## 🗄️ 2. Lancer MongoDB

### 📥 Télécharger l’image MongoDB

```bash
docker pull mongo:latest
```

### ▶️ Démarrer le conteneur MongoDB

```bash
docker run -d \
  --name mongodb \
  --network my-network \
  -p 27017:27017 \
  mongo:latest
```

---

## 🧠 3. Construire l’application Node.js

Depuis le dossier du projet (où se trouve le Dockerfile) :

```bash
docker build -t map-app .
```

---

## ▶️ 4. Lancer l’application

```bash
docker run -d \
  --name map-app \
  --network my-network \
  -p 5000:5000 \
  map-app
```

---

## 🌐 5. Accéder à l’application

Ouvrir dans le navigateur :

```text
http://localhost:5000
```

---

## 🧪 6. Vérifier les données MongoDB

### Accéder au shell MongoDB :

```bash
docker exec -it mongodb mongosh
```

### Commandes utiles :

```js
show dbs
use map_database
show collections
db.sensors.find().limit(5)
```

---

## 📊 7. Vérifier les conteneurs

```bash
docker ps
```

---

## 🛑 8. Arrêter les conteneurs

```bash
docker stop map-app mongodb
```

---

## 🗑️ 9. Supprimer les conteneurs

```bash
docker rm map-app mongodb
```

---

## ⚠️ Remarques importantes

* Le backend se connecte à MongoDB via :

```text
mongodb://mongodb:27017
```

👉 `mongodb` correspond au **nom du conteneur**

* Le réseau `my-network` est obligatoire pour la communication entre services

* Le fichier CSV est automatiquement chargé au démarrage si la base est vide

---

## 💡 Astuces

* Voir les logs :

```bash
docker logs map-app
docker logs mongodb
```

* Redémarrer un conteneur :

```bash
docker restart map-app
```

---


