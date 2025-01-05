document.getElementById("create-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form from submitting the traditional way

    const title = document.getElementById("title").value;
    const body = document.getElementById("body").value;
    const imageUrl = document.getElementById("imageUrl").value;
    const errorMessageContainer = document.getElementById("error-message");

    // Simple validation to check if both title and body are filled
    if (!title || !body || !imageUrl) {
        showError("All fields (title, body, image URL) are required.");
        return;
    }

    // Simulate article creation by sending to the API
    const newArticle = {
        title: title,
        body: body,
        imageUrl: imageUrl
    };

    fetch('http://localhost:3000/api/news', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newArticle)
    })
    .then(response => response.json())
    .then(data => {
        alert("Article created successfully!");
        window.location.href = 'index.html'; // Redirect to the articles list
    })
    .catch(error => {
        showError("Failed to create article. Please try again.");
        console.error("Error:", error);
    });

    // Reset the form fields
    document.getElementById("create-form").reset();
});

// Function to display error message
function showError(message) {
    const errorMessageContainer = document.getElementById("error-message");
    errorMessageContainer.textContent = message;
    errorMessageContainer.style.color = 'red';
}
