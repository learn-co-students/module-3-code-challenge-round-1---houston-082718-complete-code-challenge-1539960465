let imageId = 1226; //Enter the id from the fetched image here

const imageURL = `https://randopic.herokuapp.com/images/${imageId}`;

const likeURL = `https://randopic.herokuapp.com/likes/`;

const commentsURL = `https://randopic.herokuapp.com/comments/`;

document.addEventListener("DOMContentLoaded", () => {
  console.log("%c DOM Content Loaded and Parsed!", "color: magenta");
  fetchAndRenderData();
});

// 1. As a user, when the page loads I will see an image,

function fetchAndRenderData() {
  fetch(imageURL)
    .then(resp => resp.json())
    .then(data => {
      //render image
      renderImage(data.url);
      document.getElementById("comments").innerHTML = "";
      //render comments
      data.comments.forEach(comment => {
        renderComment(comment.content);
      });
      //render likes
      console.log(data.like_count);
      renderLikes(data.like_count);
      //click to like and render to page
      likeListener(data);
      // submit form
      submitComment(data);
    });
}

function renderImage(url) {
  document.getElementById("image").src = url;
}

// 2. user see all the comment
function renderComment(comment) {
  document.getElementById("comments").innerHTML += `
  <li>${comment} <button id="delete" onclick="deleteComment()">Delete</button></li>
  `;
}

// 3. see all the likes
function renderLikes(likes) {
  let likesText = document.getElementById("likes");
  likesText.innerText = `${likes}`;
}

// 4. As a user, I can click to like an image, which will increase the number of likes that image has by one

function likeListener(data) {
  let likeBnt = document.getElementById("like_button");
  likeBnt.setAttribute("data-like", `${data.like_count}`);
  let likeCount = data.like_count;
  likeBnt.addEventListener("click", event => {
    event.preventDefault();
    likeCount++;
    renderLikes(likeCount);
    let updatedData = {
      image_id: imageId
    };
    post(likeURL, updatedData);
  });
}

// As a user I can fill out an input fields and submit the form to add a comment to an image. I should see my new comment below any previous comments.

function submitComment(data) {
  let comment = document.getElementById("comment_form");
  comment.addEventListener("submit", event => {
    event.preventDefault();
    // let imageComments = data.comments;
    let newComment = event.target.comment.value;

    renderComment(newComment);
    let updatedData = {
      image_id: imageId,
      content: newComment
    };
    post(commentsURL, updatedData);
    event.target.reset();
  });
}

// POST request
function post(url, data) {
  fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });
}

// DELETE request
// function deleteComment(url, data) {
//   fetch(url, {
//     method: "DELETE",
//     body: JSON.stringify(data),
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json"
//     }
//   });
// }
