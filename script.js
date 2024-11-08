// script.js
document.addEventListener('DOMContentLoaded', () => {
    const commentForm = document.getElementById('commentForm');
    const commentInput = document.getElementById('commentInput');
    const fileInput = document.getElementById('fileInput');
    const commentsDisplay = document.getElementById('commentsDisplay');

    // Load existing comments from local storage
    loadComments();

    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const commentText = commentInput.value;
        const file = fileInput.files[0];

        if (commentText) {
            const comment = {
                text: commentText,
                file: file ? URL.createObjectURL(file) : null,
                timestamp: new Date().toISOString()
            };
            saveComment(comment);
            commentInput.value = '';
            fileInput.value = '';
            loadComments();
        }
    });

    function saveComment(comment) {
        const comments = JSON.parse(localStorage.getItem('comments')) || [];
        comments.push(comment);
        localStorage.setItem('comments', JSON.stringify(comments));
    }

    function loadComments() {
        commentsDisplay.innerHTML = '';
        const comments = JSON.parse(localStorage.getItem('comments')) || [];
        comments.forEach(comment => {
            const commentDiv = document.createElement('div');
            commentDiv.classList.add('comment');
            commentDiv.innerHTML = `
                <p>${comment.text}</p>
                ${comment.file ? `<img src="${comment.file}" alt="Uploaded file" />` : ''}
                <small>${new Date(comment.timestamp).toLocaleString()}</small>
            `;
            commentsDisplay.appendChild(commentDiv);
        });
    }
});
