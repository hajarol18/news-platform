const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController'); // Importer le contrôleur

// Route pour obtenir la liste de tous les articles
router.get('/', newsController.getAllNews);

// Route pour obtenir un article par son ID
router.get('/:id', newsController.getNewsById);

// Route pour ajouter un nouvel article
router.post('/', newsController.createNews);

// Route pour mettre à jour un article par son ID
router.put('/:id', newsController.updateNews);

// Route pour supprimer un article par son ID
router.delete('/:id', newsController.deleteNews);

module.exports = router;
