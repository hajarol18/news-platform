// Fonction pour récupérer et afficher les derniers articles
async function fetchLatestNews() {
    try {
        const response = await fetch('/api/news'); // Appel à l'API pour récupérer les articles
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des articles'); // Lancer une erreur si la réponse n'est pas ok
        }
        const data = await response.json();
        displayNews(data.posts); // Appel de la fonction pour afficher les articles
    } catch (error) {
        console.error('Erreur:', error);
        showError('Impossible de charger les articles'); // Afficher un message d'erreur en cas de problème
    }
}

// Compléter la fonction displayNews
function displayNews(news) {
    const container = document.getElementById('news-container');
    container.innerHTML = ''; // Vider le conteneur avant d'ajouter les articles

    // Parcourir chaque article et créer un élément pour chaque article
    news.forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.classList.add('col-md-4', 'mb-4'); // Utilisation de la grille Bootstrap pour une disposition responsive

        // Construire le contenu HTML de chaque carte d'article
        articleElement.innerHTML = `
            <div class="card">
                <img src="${article.image || 'https://via.placeholder.com/150'}" class="card-img-top" alt="${article.title}">
                <div class="card-body">
                    <h5 class="card-title">${article.title}</h5>
                    <p class="card-text">${article.body.slice(0, 100)}...</p> <!-- Affichage des 100 premiers caractères -->
                    <a href="news.html?id=${article.id}" class="btn btn-primary">Lire plus</a> <!-- Lien vers la page de l'article -->
                </div>
            </div>
        `;

        // Ajouter l'élément de l'article au conteneur
        container.appendChild(articleElement);
    });
}

// Compléter la fonction showError
function showError(message) {
    const errorContainer = document.getElementById('error-container'); // Conteneur pour afficher les erreurs
    errorContainer.innerHTML = `<div class="alert alert-danger" role="alert">${message}</div>`; // Afficher un message d'erreur avec Bootstrap
}

// Initialisation : récupérer les articles au chargement de la page
document.addEventListener('DOMContentLoaded', fetchLatestNews);
