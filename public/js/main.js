document.addEventListener('DOMContentLoaded', function () {
    // Fonction pour charger les articles
    function loadArticles() {
        fetch('http://localhost:3000/api/news') // URL de l'API pour obtenir les articles
            .then(response => response.json()) // Convertir la réponse en JSON
            .then(articles => {
                const newsContainer = document.getElementById('newsContainer');
                newsContainer.innerHTML = ''; // Vider le conteneur avant de le remplir

                // Vérifier si des articles existent
                if (articles.length === 0) {
                    const errorMessage = document.getElementById('error-message');
                    errorMessage.textContent = 'No articles found!';
                } else {
                    // Parcourir chaque article et l'ajouter au conteneur
                    articles.forEach(article => {
                        const articleDiv = document.createElement('div');
                        articleDiv.classList.add('col-md-4', 'mb-4');
                        articleDiv.innerHTML = `
                            <div class="card animate__animated animate__fadeIn">
                                <img src="${article.imageUrl}" class="card-img-top" alt="${article.title}">
                                <div class="card-body">
                                    <h5 class="card-title">${article.title}</h5>
                                    <p class="card-text">${article.body}</p>
                                    <a href="news.html?id=${article.id}" class="btn btn-primary">Read More</a>
                                    <button class="btn btn-danger" onclick="deleteArticle(${article.id})">Delete</button>
                                </div>
                            </div>
                        `;
                        newsContainer.appendChild(articleDiv);
                    });
                }
            })
            .catch(error => {
                console.error('Error fetching articles:', error);
                const errorMessage = document.getElementById('error-message');
                errorMessage.textContent = 'Failed to load articles.';
            });
    }

    // Appel de la fonction pour charger les articles au chargement de la page
    loadArticles();
});

// Fonction pour supprimer un article
function deleteArticle(id) {
    if (confirm('Are you sure you want to delete this article?')) {
        fetch(`http://localhost:3000/api/news/${id}`, {
            method: 'DELETE',  // Méthode HTTP pour supprimer
        })
        .then(response => response.json())
        .then(data => {
            alert('Article deleted successfully!');
            location.reload();  // Recharger la page après suppression
        })
        .catch(error => {
            console.error('Error deleting article:', error);
            alert('Failed to delete article.');
        });
    }
}
