imageId = 1222 //Enter the id from the fetched image here
imageURL = `https://randopic.herokuapp.com/images/${imageId}`
likeURL = `https://randopic.herokuapp.com/likes/`
commentsURL = `https://randopic.herokuapp.com/comments/`

document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta');

  fetchImage();
})

document.addEventListener('click', function(event) {
  event.preventDefault();

  if (event.target.id === 'comment-submit') {
    addCommentToPage();
    clearCommentForm();
  }
  if (event.target.className === 'delete') {
    deleteComment(event.target.dataset.id);
  }
})

function fetchImage() {
  fetch(imageURL)
  .then(response => response.json())
  .then(renderImage)
  .then(renderComments)
}

function renderImage(image) {
  let imageCard = document.getElementById("image_card");
  
  imageCard.innerHTML =
    `<img src="${image.url}" id="image" data-id=""/>
    <h4 id="name" data-id="${image.id}">${image.name}</h4>
    <span>Likes:
      <span id="likes">${image.like_count}</span>
    </span>
    <button id="like_button" onclick="increaseLikes()">Like</button>
    <form id="comment_form">
      <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
      <input type="submit" id="comment-submit" value="Submit"/>
    </form>
    <ul id="comments"></ul>`
}

function renderComments() {
  let commentList = document.getElementById("comments");

  fetch(imageURL)
  .then(response => response.json())
  .then(image => {
    image.comments.forEach(comment => {
      commentList.innerHTML += 
        `<li>${comment.content}</li>
        <button class="delete" data-id="${comment.id}">Delete Comment</button>`
    })
  })
}

function increaseLikes() {
  let likes = document.getElementById('likes');
  let newLikes = parseInt(likes.innerText) + 1;
  likes.innerText = newLikes;

  changeLikesInDatabase(newLikes);
}

function changeLikesInDatabase(likeCount) {
  const data = {
    image_id: 1222,
    like_count: likeCount
  };

  fetch(likeURL, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
}

function addCommentToPage() {
  let commentList = document.getElementById('comments');
  let commentInput = document.getElementById('comment_input').value;
  commentList.innerHTML += `<li>${commentInput}</li>`;
  addCommentToDatabase(commentInput);
}

function clearCommentForm() {
  document.getElementById('comment_input').value = "";
}

function addCommentToDatabase(comment) {
  const data = {
    image_id: 1222,
    content: comment
  };

  fetch(commentsURL, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(fetchImage);
}

function deleteComment(id) {
  fetch(`${commentsURL}/${id}`, {
    method: "DELETE"
  })
  .then(fetchImage);
}