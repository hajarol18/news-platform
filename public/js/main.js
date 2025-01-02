
async function fetchLatestNews() {
    try {
        const response = await fetch('/api/news'); 
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des articles'); 
        }
        const data = await response.json();
        displayNews(data.posts); 
    } catch (error) {
        console.error('Erreur:', error);
        showError('Impossible de charger les articles'); 
    }
}


function displayNews(news) {
    const container = document.getElementById('news-container');
    container.innerHTML = ''; 

    
    news.forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.classList.add('col-md-4', 'mb-4');

        
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

        
        container.appendChild(articleElement);
    });
}


function showError(message) {
    const errorContainer = document.getElementById('error-container'); 
    errorContainer.innerHTML = `<div class="alert alert-danger" role="alert">${message}</div>`; 
}


document.addEventListener('DOMContentLoaded', fetchLatestNews);
