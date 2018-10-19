document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
  let imageId = 1227 //Enter the id from the fetched image here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  getData(imageId)
  document.addEventListener('click', () => {
    if (event.target.id === "like_button") {
      event.target.previousElementSibling.childNodes[1].innerText = (event.target.dataset.likes + 1)
      updateLikes(event.target.dataset.id)
    } else if (event.target.parentElement.id == 'comment_form') {
      event.preventDefault();
      comment = document.getElementById("comment_form")
      data = comment.childNodes[1].value
      thing(data)
      newComment(data, imageId)
    } else if (event.target.id == "delete")
      commentId = event.target.dataset.commentid
    deleteData(commentId)

  })
})

function thing() {
  document.getElementById("comments").innerHTML += `<li>${data}</li>`
}

// --------------------------------------------------------------------

function getData(id) {
  fetch(`https://randopic.herokuapp.com/images/${id}`)
    .then(resp => resp.json())
    .then(image => displayImage(image))
}

function displayImage(image) {
  add = document.getElementById('picCards')
  add.innerHTML +=
    `<div id="${image.id}" class="card col-md-4">
  <img src="${image.url}" id="${image.id}" data-id="${image.id}"/>
  <h4 id="${image.name}"></h4>
  <span>Likes:
    <span id="${image.id}">${image.like_count}</span>
  </span>
  <button data-likes="${image.like_count}"data-id="${image.id}"id="like_button">Like</button>
  <form id="comment_form">
    <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
    <input type="submit" value="Submit"/>
  </form>
  <ul id="comments">
  <li>${image.comments[0].content}<button data-commentId="${image.comments[0].id}"id="delete">Delete</button></li>
  <li>${image.comments[2].content}<button data-commentId="${image.comments[2].id}"id="delete">Delete</button></li>
  <li>${image.comments[3].content}<button data-commentId="${image.comments[3].id}"id="delete">Delete</button></li>
  <li>${image.comments[4].content}<button data-commentId="${image.comments[4].id}"id="delete">Delete</button></li>
  <li>${image.comments[5].content}<button data-commentId="${image.comments[5].id}"id="delete">Delete</button></li>
  <li>${image.comments[6].content}<button data-commentId="${image.comments[6].id}"id="delete">Delete</button></li>
  <li>${image.comments[7].content}<button data-commentId="${image.comments[7].id}"id="delete">Delete</button></li>
  <li>${image.comments[8].content}<button data-commentId="${image.comments[8].id}"id="delete">Delete</button></li>
  </ul>
</div>`
}

// --------------------------------------------------------------------

function updateLikes(id) {
  data = {
    image_id: parseInt(id)
  }

  return fetch(`https://randopic.herokuapp.com/likes`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(data)
  }).then(clear()).then(getData(id))
}

function clear() {
  add = document.getElementById('picCards')
  add.innerHTML = ""
}

// --------------------------------------------------------------------

function newComment(comment, id) {
  data = {
    image_id: id,
    content: comment
  }
  return fetch(`https://randopic.herokuapp.com/comments/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(data)
  })
}
// --------------------------------------------------------------------

function deleteData(commentId) {
  return fetch(`https://randopic.herokuapp.com/comments/${commentId}`, {
    method: 'DELETE'
  })
    .then(response => response.json());
}