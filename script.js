// script.js
document.getElementById('commentForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const commentInput = document.getElementById('commentInput').value;
    const fileInput = document.getElementById('fileInput').files[0];
    const commentsDisplay = document.getElementById('commentsDisplay');

    if (commentInput) {
        const comment = {
            text: commentInput,
            file: fileInput ? URL.createObjectURL(fileInput) : null,
            reactions: 0
        };

        // Save comment to local storage
        let comments = JSON.parse(localStorage.getItem('comments')) || [];
        comments.push(comment);
        localStorage.setItem('comments', JSON.stringify(comments));

        // Clear input fields
        document.getElementById('commentInput').value = '';
        document.getElementById('fileInput').value = '';

        displayComments();
    }
});

function displayComments() {
    const commentsDisplay = document.getElementById('commentsDisplay');
    commentsDisplay.innerHTML = '';

    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.forEach((comment, index) => {
        const commentDiv = document.createElement('div');
        commentDiv.classList.add('comment');
        commentDiv.innerHTML = `
            <p>${comment.text}</p>
            ${comment.file ? `<img src="${comment.file}" alt="Uploaded file" style="max-width: 100px;"/>` : ''}
            <span class="reaction" onclick="reactToComment(${index})">👍 ${comment.reactions}</span>
        `;
        commentsDisplay.appendChild(commentDiv);
    });
}

function reactToComment(index) {
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments[index].reactions += 1;
    localStorage.setItem('comments', JSON.stringify(comments));
    displayComments();
}

// Initial display of comments
displayComments();
