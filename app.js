const express = require("express");
const { MongoClient } = require("mongodb");
const fs = require("fs");
const csv = require("csv-parser");
const path = require("path");

const app = express();
const port = 5000;
const mongoUrl = "mongodb://mongodb:27017";
const dbName = "map_database";
let collection;

// Connexion MongoDB avec retry
async function connectMongo(retries = 20, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      const client = new MongoClient(mongoUrl);
      await client.connect();
      console.log("Connexion MongoDB réussie !");
      const db = client.db(dbName);
      collection = db.collection("sensors");
      return;
    } catch (err) {
      console.log(`MongoDB non prêt, tentative ${i + 1}/${retries} ... attente ${delay}ms`);
      await new Promise(res => setTimeout(res, delay));
    }
  }
  throw new Error("Impossible de se connecter à MongoDB après plusieurs tentatives");
}

// Charger CSV dans MongoDB si collection vide
async function loadCSV() {
  const count = await collection.countDocuments();
  if (count === 0) {
    const results = [];
    fs.createReadStream("data/sensor_metadata.csv")
      .pipe(csv({ separator: "," })) // Le nouveau CSV utilise des virgules:  transforme chaque ligne CSV en objet JavaScript.
      .on("data", (data) => {
        // Nettoyer les noms de colonnes (enlever les espaces éventuels)
        const cleanData = {};
        Object.keys(data).forEach(key => {
          const cleanKey = key.trim();
          cleanData[cleanKey] = data[key];
        });
      //Création de l’objet capteur
        const sensorId = parseInt(cleanData['Sensor ID']);
        const latitude = parseFloat(cleanData['Latitude']);
        const longitude = parseFloat(cleanData['Longitude']);
        const length = parseFloat(cleanData['Length (km)']);
        const lanes = parseInt(cleanData['Lanes']);

        results.push({
          sensorId: isNaN(sensorId) ? 0 : sensorId,
          freeway: cleanData['Freeway'] || "Unknown",//nom de l’autoroute où se trouve le capteur
          direction: cleanData['Direction'] || "Unknown",//Direction de circulation sur l’autoroute.(N = North,S = South,E = East,W = West)
          postmile: cleanData['Postmile'] || "0",//Position du capteur le long de l’autoroute.(Postmile = 34.5 cela veut dire: 34.5 miles depuis le début de l’autoroute)
          lat: isNaN(latitude) ? 0 : latitude,
          lng: isNaN(longitude) ? 0 : longitude,
          lengthKm: isNaN(length) ? 0 : length,//(Length (km) = 0.5 : Cela signifie que le capteur surveille une portion de 0,5 km sur cette autoroute.)
          lanes: isNaN(lanes) ? 0 : lanes //(Nombre de voies de circulation sur cette section d’autoroute.)
        });
      })
      .on("end", async () => {
        await collection.insertMany(results);
        console.log(`${results.length} capteurs insérés dans MongoDB !`);
      });
  } else {
    console.log(`${await collection.countDocuments()} capteurs déjà présents dans MongoDB`);
  }
}

// Servir le front-end
app.use(express.static(path.join(__dirname, "public")));

// Route pour récupérer tous les capteurs
app.get("/sensors", async (req, res) => {
  try {
    const sensors = await collection.find({}).toArray();
    res.json(sensors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route pour filtrer par autoroute
app.get("/sensors/freeway/:freeway", async (req, res) => {
  try {
    const sensors = await collection.find({ freeway: req.params.freeway }).toArray();
    res.json(sensors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Démarrage serveur après connexion à MongoDB
connectMongo()
  .then(async () => {
    await loadCSV();
    app.listen(port, "0.0.0.0", () => {
      console.log(`Serveur lancé sur port ${port}`);
    });
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });