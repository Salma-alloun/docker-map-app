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

## 📸 Capture d'écran

*Ajoutez ici une capture d'écran de votre application*

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

## 🚀 Installation

### Avec Docker (recommandé)

```bash
# Cloner le repository
git clone  https://github.com/Salma-alloun/docker-map-app.git

# Se déplacer dans le dossier
cd docker-map-app

# Construire l'image Docker
docker build -t map-app .

# Lancer le conteneur
docker run -p 5000:5000 --name map-app map-app
