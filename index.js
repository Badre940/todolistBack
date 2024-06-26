require('dotenv').config(); // Chargement des variables d'environnement depuis un fichier .env
const express = require("express");
const http = require("http");
 const cors = require("cors"); // Pas nécessaire en développement local
const router = require('./router/router');
const cookieParser = require("cookie-parser");
const app = express();
const server = http.createServer(app);

app.use(cors({
  origin: 'http://localhost:5434/' // Remplacez par l'URL correcte de votre front-end
 }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(router);

// Middleware pour gérer les requêtes vers des ressources inexistantes
app.use((req, res, next) => {
  const message = "Impossible de trouver la ressource demandée! Vous pouvez essayer une autre URL.";
  res.status(404).json({ message });
});

const port = process.env.PORT ;

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is listening on port ${port}`);
});
