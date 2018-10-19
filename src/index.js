document.addEventListener("DOMContentLoaded", () => {
  console.log("%c DOM Content Loaded and Parsed!", "color: magenta");

  let imageId = 1220;

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`;

  const likesURL = `https://randopic.herokuapp.com/likes`;

  const commentsURL = `https://randopic.herokuapp.com/comments/`;

  fetchAndRenderImage(imageURL);

  document.addEventListener("click", event => {
    if (event.target.id === "like_button") {
      addLike(likesURL, imageId);
    }
    if (event.target.value === "Submit") {
      event.preventDefault();
      addComment(
        event.target.previousElementSibling.value,
        commentsURL,
        imageId
      );
    }
  });
});

function addComment(comment, url, id) {
  let data = {
    image_id: id,
    content: comment
  };
  fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });
  renderComment(comment);
}

function renderComment(comment) {
  comments = document.getElementById("comments");
  comments.innerHTML += `<li>${comment}</li>`;
}

function addLike(url, id) {
  let data = {
    image_id: id
  };
  fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });
  likes = document.querySelector("#likes");
  likes.innerText = parseInt(likes.innerHTML) + 1;
}

function fetchAndRenderImage(url) {
  fetch(url)
    .then(resp => resp.json())
    .then(image => renderImage(image));
}

function renderImage(img) {
  let container = document.querySelector(".container");
  container.innerHTML = `<div class="row" id="image_content">
  <div class="card col-md-4"></div>
  <div id="image_card" class="card col-md-4">
    <img src="${img.url}" id="image" data-id="${img.id}"/>
    <h4 id="name">${img.name}</h4>
    <span>Likes:
      <span id="likes" data-id = "${img.id}">${img.like_count}</span>
    </span>
    <button id="like_button">Like</button>
    <form id="comment_form">
      <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
      <input type="submit" value="Submit"/>
    </form>
    <ul id="comments">`;
  img.comments.forEach(comment => {
    container.innerHTML += `<li class = "posted_comment">${
      comment.content
    }</li>`;
  });
  container.innerHTML += `</ul>
    </div>
    <div class="card col-md-4"></div>
  </div>`;
}
