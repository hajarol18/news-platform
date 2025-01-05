const articleContainer = document.getElementById("articleContainer");

const urlParams = new URLSearchParams(window.location.search);
const articleId = parseInt(urlParams.get('id'), 10);

function displayArticle() {
    if (isNaN(articleId)) {
        articleContainer.innerHTML = `<p style="color: red;">Invalid article ID.</p>`;
        return;
    }

    fetch(`http://localhost:3000/api/news/${articleId}`)
        .then(response => response.json())
        .then(article => {
            if (!article) {
                articleContainer.innerHTML = `<p style="color: red;">Article not found.</p>`;
                return;
            }

            const articleHTML = `
                <div class="card">
                    <img src="${article.imageUrl}" class="card-img-top" alt="${article.title}">
                    <div class="card-body">
                        <h5 class="card-title">${article.title}</h5>
                        <p class="card-text">${article.body}</p>
                    </div>
                </div>
            `;
            articleContainer.innerHTML = articleHTML;
        })
        .catch(error => {
            articleContainer.innerHTML = `<p style="color: red;">Failed to load the article. Please try again.</p>`;
            console.error("Error:", error);
        });
}

displayArticle();
