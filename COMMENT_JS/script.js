// Load existing comments from localStorage or start with an empty array
let comments = JSON.parse(localStorage.getItem("comments")) || [];

const commentsContainer = document.getElementById("comments-container");
const commentInput = document.getElementById("comment-input");
const postCommentButton = document.getElementById("post-comment");




// Function to render comments
function renderComments() {
    commentsContainer.innerHTML = "";
    comments.forEach(comment => {
        const commentDiv = createCommentDiv(comment);
        commentsContainer.appendChild(commentDiv);
    });
}

// Function to create a comment div
function createCommentDiv(comment) {
    const commentDiv = document.createElement("div");
    commentDiv.className = "comment";
    commentDiv.innerHTML = `
        <p>${comment.content}</p>
        <button class="delete-comment">Delete</button>
        <button class="reply">Reply</button>
        <div class="reply-input">
            <input type="text" placeholder="Add a reply">
            <button class="post-reply">Post Reply</button>
        </div>
    `;

    const replyInput = commentDiv.querySelector("input[type='text']");
    const postReplyButton = commentDiv.querySelector(".post-reply");
    const replyButton = commentDiv.querySelector(".reply");
    const deleteCommentButton = commentDiv.querySelector(".delete-comment");

    // Event listener to post replies
    postReplyButton.addEventListener("click", () => {
        const replyContent = replyInput.value.trim();
        if (replyContent !== "") {
            const reply = {
                id: generateUniqueId(),
                content: replyContent,
                replies: [], // Initialize with an empty array for nested replies
                createdTime: new Date().toLocaleString(), // Add timestamp
                author: "Rahul", // Set the author
                level: comment.level + 1, // Set the level
            };
            comment.replies.push(reply);
            renderComments(); // Render comments after adding a reply
        }
    });

    // Event listener to show/hide reply input
    replyButton.addEventListener("click", () => {
        const replyInputDiv = commentDiv.querySelector(".reply-input");
        replyInputDiv.style.display = replyInputDiv.style.display === "none" ? "block" : "none";
    });

    // Event listener to delete comments or replies
    deleteCommentButton.addEventListener("click", () => {
        const parentComment = findParentComment(comments, comment.id);
        if (parentComment) {
            parentComment.replies = parentComment.replies.filter(reply => reply.id !== comment.id);
        } else {
            // If it's a top-level comment, remove it from the main comments array
            comments = comments.filter(c => c.id !== comment.id);
        }
        renderComments(); // Render comments after deleting
    });

    // Render replies if they exist
    if (comment.replies && comment.replies.length > 0) {
        const repliesContainer = document.createElement("div");
        comment.replies.forEach(reply => {
            const replyDiv = createCommentDiv(reply);
            repliesContainer.appendChild(replyDiv);
        });
        commentDiv.appendChild(repliesContainer);
    }

    return commentDiv;
}

// Function to find the parent comment of a reply
function findParentComment(comments, replyId) {
    for (const comment of comments) {
        if (comment.replies && comment.replies.length > 0) {
            const foundComment = comment.replies.find(reply => reply.id === replyId);
            if (foundComment) {
                return comment;
            } else {
                const parent = findParentComment(comment.replies, replyId);
                if (parent) {
                    return parent;
                }
            }
        }
    }
    return null;
}

// Event listener to post comments
postCommentButton.addEventListener("click", () => {
    const commentContent = commentInput.value.trim();
    if (commentContent !== "") {
        const comment = {
            id: generateUniqueId(),
            content: commentContent,
            replies: [],
            createdTime: new Date().toLocaleString(), // Add timestamp
            author: "Rahul", // Set the author
            level: 0, // Set the level for top-level comments
        };
        comments.push(comment);
        renderComments(); // Render comments after adding a comment
        commentInput.value = "";
    }
});

// Function to generate unique IDs for comments and replies
function generateUniqueId() {
    return Math.random().toString(36).substr(2, 9);
}

// Initial rendering of comments
renderComments();

// Save comments to localStorage whenever comments are modified
function saveCommentsToLocalStorage() {
    localStorage.setItem("comments", JSON.stringify(comments));
}

window.addEventListener("unload", saveCommentsToLocalStorage);