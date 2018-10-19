let imageData
const likeURL = `https://randopic.herokuapp.com/likes/`
let imageId = 1224
let commentId = 6375
const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
const commentsURL = `https://randopic.herokuapp.com/comments/`

document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

fetchImage() 
addToLikeCount()
document.getElementById('comment_form').addEventListener('submit', addComment)
})
function fetchImage() {
  fetch(imageURL)
  .then(response => response.json())
  .then(data => {
    imageData = data
  }).then(() => displayImage(imageData))
}

function displayImage(data) {
  const image = document.getElementById('image')
  const name = document.getElementById('name')
  const likes = document.getElementById('likes')
  const comments = document.getElementById('comments')
  image.src = data.url
  name.innerText = data.name
  likes.innerText = data.like_count
  while(comments.firstChild){
    comments.removeChild(comments.firstChild);
  }
  data.comments.forEach((comment) => {
    let li = document.createElement('li');
    li.id = comment.id
    li.innerText = comment.content;
    comments.appendChild(li)
  })
}

function addToLikeCount() {
  document.getElementById('like_button').addEventListener('click', () => {
    let likes = document.getElementById('likes')
    let likesInt = parseInt(likes.innerText)
    likesInt += 1
    likes.innerText = likesInt
    addLikesToApi(likesInt)
  })
}

function addLikesToApi(likesInt) {
  fetch(likeURL, {
    method: "POST",
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({
    image_id: 1224,
    like_count: likesInt
    })
  }).then(() => fetchImage()) 
}

function addComment() {
  event.preventDefault()
  const comments = document.getElementById('comments')
  let li = document.createElement('li')
  commentId += 1
  li.id = commentId
  li.innerText = event.target.comment.value
  comments.appendChild(li)
  addCommentToApi(event)
}

function addCommentToApi(event) {
  fetch(commentsURL, {
    method: "POST",
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({
    image_id: 1224,
    content: event.target.comment.value
    })
  }).then(() => event.target.reset())
  .then(() => fetchImage()) 
}
