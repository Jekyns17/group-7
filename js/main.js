/* ==========================================================================
   Group 7 - Simple Interactive Script
   Very simple to understand and explain to the lecturer!
   Contains:
   1. Like Button (Counts clicks and saves them in browser memory)
   2. Leave a Message Box (Adds friendly comments to the page)
   ========================================================================== */

// Wait for the HTML document to fully load before running JavaScript
document.addEventListener('DOMContentLoaded', () => {

  // Get current student's name from <body data-student="...">
  const student = document.body.getAttribute('data-student') || 'student';

  /* ------------------------------------------------------------------------
     1. LIKE BUTTON FEATURE
     ------------------------------------------------------------------------ */
  const likeBtn = document.getElementById('like-btn');
  const likeCountSpan = document.getElementById('like-count');

  if (likeBtn && likeCountSpan) {
    // Unique storage key so each student page has its own separate likes
    const storageKey = 'group7_likes_' + student;

    // Retrieve saved likes from localStorage, or start at 0 if none exist
    let count = parseInt(localStorage.getItem(storageKey), 10) || 0;
    likeCountSpan.textContent = count;

    // When the user clicks the like button
    likeBtn.addEventListener('click', () => {
      count++; // Add 1 to the count
      likeCountSpan.textContent = count; // Update the number on screen
      localStorage.setItem(storageKey, count); // Save new count in browser memory
    });
  }

  /* ------------------------------------------------------------------------
     2. LEAVE A MESSAGE (COMMENT) FEATURE
     ------------------------------------------------------------------------ */
  const commentForm = document.getElementById('comment-form');
  const commentsList = document.getElementById('comments-list');
  const authorInput = document.getElementById('comment-author');
  const messageInput = document.getElementById('comment-message');

  if (commentForm && commentsList) {
    // Storage key for saving comments
    const commentsKey = 'group7_comments_' + student;

    // Helper function: creates a comment box and displays it on the page
    function displayComment(name, text) {
      const item = document.createElement('div');
      item.className = 'comment-item';

      const author = document.createElement('div');
      author.className = 'comment-author';
      author.textContent = name;

      const message = document.createElement('p');
      message.textContent = text;

      item.appendChild(author);
      item.appendChild(message);
      commentsList.appendChild(item);
    }

    // Load any saved comments from browser memory
    const saved = JSON.parse(localStorage.getItem(commentsKey) || '[]');
    saved.forEach(item => displayComment(item.name, item.text));

    // Handle form submission
    commentForm.addEventListener('submit', (event) => {
      event.preventDefault(); // Stop the webpage from reloading

      const name = authorInput.value.trim();
      const text = messageInput.value.trim();

      // Check if both fields have text
      if (name !== '' && text !== '') {
        displayComment(name, text); // Show comment on screen

        saved.push({ name, text }); // Add to our list
        localStorage.setItem(commentsKey, JSON.stringify(saved)); // Save list

        // Clear input boxes for the next message
        authorInput.value = '';
        messageInput.value = '';
      }
    });
  }

});
