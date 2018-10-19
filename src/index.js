document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 1231

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  getImageData(imageURL)
  listenForLikeButtonClick()
  listenForCommentSubmit()
  listenForCommentDelete()

  function getImageData(url) {
    fetch(url)
    .then(response => response.json())
    .then(json => renderImageData(json))
  }

  function renderImageData(imageData) {
    document.getElementById("image").src = imageData.url
    document.getElementById("image").dataset.id = imageData.id
    document.getElementById("name").textContent = imageData.name
    document.getElementById("likes").textContent = imageData.like_count

    document.getElementById("comments").innerHTML = ""
    for (const comment of imageData.comments) {
      renderComment(comment.content, comment.id)
    }
  }

  function listenForLikeButtonClick() {
    document.getElementById("like_button").addEventListener("click", () => {
      addLike(imageId)
    })
  }

  function addLike(imageId) {
    addLikeOnPage()

    const url = "https://randopic.herokuapp.com/likes"
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({image_id: imageId}),
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
  }

  function addLikeOnPage() {
    const likesCount = document.getElementById("likes")
    likesCount.textContent = parseInt(likesCount.textContent) + 1
  }

  function listenForCommentSubmit() {
    document.getElementById("comment_form").addEventListener("submit", (event) => {
      event.preventDefault()
      addComment(document.getElementById("comment_input").value)
    })
  }

  function addComment(comment) {
    const commentElement = renderComment(comment)

    const url = "https://randopic.herokuapp.com/comments"
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({image_id: imageId, content: comment}),
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(json => addIDToComment(json.id, commentElement))
  }

  function renderComment(comment, commentID = null) {
    const commentElement = document.createElement("LI")
    commentElement.innerHTML = `${comment} <button class="delete-comment-button" disabled="true">Delete</button>`
    document.getElementById("comments").appendChild(commentElement)

    if (commentID != null) {
      addIDToComment(commentID, commentElement)
    }

    return commentElement
  }

  function addIDToComment(commentID, commentElement) {
    commentElement.dataset.commentID = commentID
    commentElement.querySelector(".delete-comment-button").disabled = false
  }

  function listenForCommentDelete() {
    document.getElementById("comments").addEventListener("click", (event) => {
      if (!event.target.classList.contains("delete-comment-button"))
        return
      const commentElement = event.target.parentElement // the <li> with comment id
      sendDeleteCommentRequest(commentElement.dataset.commentID)
      commentElement.parentElement.removeChild(commentElement)
    })
  }

  function sendDeleteCommentRequest(id) {
    const url = `https://randopic.herokuapp.com/comments/${id}`
    fetch(url, {
      method: 'DELETE',
    })
  }
})