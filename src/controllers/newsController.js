const Joi = require('joi');
const news = []; // Tableau fictif pour les news

// Validation des données de la news
const newsSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  body: Joi.string().min(5).max(1000).required(),
  imageUrl: Joi.string().uri().required(),
});

// Fonction pour obtenir toutes les news
const getAllNews = (req, res) => {
  res.json(news);
};

// Fonction pour obtenir une news par ID
const getNewsById = (req, res) => {
  const newsItem = news.find(n => n.id === parseInt(req.params.id));
  if (!newsItem) return res.status(404).json({ message: 'News non trouvée' });
  res.json(newsItem);
};

// Fonction pour créer une news
const createNews = (req, res) => {
  const { error } = newsSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const newNews = {
    id: news.length + 1,
    ...req.body,
  };
  news.push(newNews);
  res.status(201).json(newNews);
};

// Fonction pour mettre à jour une news
const updateNews = (req, res) => {
  const { error } = newsSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const newsItem = news.find(n => n.id === parseInt(req.params.id));
  if (!newsItem) return res.status(404).json({ message: 'News non trouvée' });

  newsItem.title = req.body.title;
  newsItem.body = req.body.body;
  newsItem.imageUrl = req.body.imageUrl;

  res.json(newsItem);
};

// Fonction pour supprimer une news
const deleteNews = (req, res) => {
  const newsIndex = news.findIndex(n => n.id === parseInt(req.params.id));
  if (newsIndex === -1) return res.status(404).json({ message: 'News non trouvée' });

  news.splice(newsIndex, 1);
  res.status(204).send();
};

module.exports = {
  createNews,
  getAllNews,
  getNewsById,
  updateNews,
  deleteNews,
};
