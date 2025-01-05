require('dotenv').config(); // Charger les variables d'environnement depuis .env
const express = require('express');
const path = require('path');  // Pour manipuler les chemins
const newsRoutes = require('./routes/newsRoutes');  // Importer les routes des articles
const cors = require('cors');  // Importer le middleware CORS

const app = express();

// Middleware pour analyser le corps des requêtes en JSON
app.use(express.json());

// Middleware pour activer le CORS (permet les requêtes depuis d'autres domaines)
app.use(cors());

// Logger simple pour chaque requête (utile pour le débogage)
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Servir les fichiers statiques (comme index.html dans /public)
app.use(express.static(path.join(__dirname, 'public')));

// Utiliser les routes des articles
app.use('/api/news', newsRoutes);

// Fournir une route pour vérifier si l'API fonctionne
app.get('/api', (req, res) => {
    res.json({ message: 'Welcome to the News API!', status: 'Running' });
});

// Middleware pour gérer les erreurs 404
app.use((req, res, next) => {
    res.status(404).json({ error: 'Route not found' });
});

// Middleware centralisé pour gérer les autres erreurs
app.use((err, req, res, next) => {
    console.error(err.stack); // Log l'erreur dans la console
    res.status(500).json({ error: 'Something went wrong, please try again later.' });
});

// Démarrage du serveur sur le port 3000 ou celui défini dans l'environnement
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
