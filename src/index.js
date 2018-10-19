document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 39
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  // Grab image, comments, and like button elements
  const imgTitle = document.querySelector('#name')
  const mainImg = document.querySelector('#image')
  const imgCard = document.querySelector('#image_card')

  const commentsList = document.querySelector('#comments')
  const submitBtn = document.querySelector('#submit_comment')
  const deleteMsg = document.querySelector('.delete_msg')

  const likeBtn = document.querySelector('#like_button')
  const likeCounter = document.querySelector('#likes')

  // insert and/or manipulate elements into DOM from API
  fetch(imageURL)
  .then(resp=> resp.json())
  .then(json => {
    renderImgElements(json)
    renderComments(json)
    renderLikes(json)
  })

  // renders image and image title
  function renderImgElements(json) {
    mainImg.src = json.url
    imgTitle.innerText = json.name
  }

  // renders image comments
  function renderComments(json) {
    json.comments.map(comment=> {
      let IOSDate = new Date(comment.updated_at)
      let date = IOSDate.toLocaleString()

      commentsList.innerHTML += `
      <li id="${comment.id}" class="list_item">
        ${date} — <strong>${comment.content}</strong>
        <button id="delete${comment.id}">delete comment</button>
      </li>
      `
    })
  }

  // renders image likes
  function renderLikes(json) {
    likeCounter.innerText = json.like_count
  }

  // increase likes one click at a time
  likeBtn.addEventListener('click', function(event) {
    let likeCount = event.target.parentNode.children[2].children[0]
    if (event.target.id === 'like_button') {
      fetch(likeURL, {
        method: 'POST',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify({image_id: 39})
      }).then(() => fetch(imageURL)
        .then(resp=> resp.json())
        .then(json => renderLikes(json))
      )
    }
  })

  // add comments on submit
  submitBtn.addEventListener('click', function(event) {
    event.preventDefault()
    const commentInput = document.querySelector('#comment_input')
    if (event.target.id === 'submit_comment') {
      fetch(commentsURL, {
        method: 'POST',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify({image_id: 39, content: commentInput.value})
      }).then(() => fetch(imageURL)
        .then(resp=> resp.json())
        .then(json => {
          commentsList.innerHTML = ''
          renderComments(json)
        })
      )
    }
  })

  // make DELETE request on comment buttons
  document.addEventListener('click', function(event) {
    event.preventDefault()
    if (event.target.id.includes('delete')) {
      let uri = event.target.id.slice(6, event.target.id.length)
      debugger
      fetch(commentsURL + uri, {
        method: 'DELETE'
      }).then(() => fetch(imageURL)
        .then(resp=> resp.json())
        .then(json => {
          commentsList.innerHTML = ''
          renderComments(json)
          deleteMsg.innerHTML = 'Comment deleted successfully!'
          setTimeout(function() {
            deleteMsg.innerHTML = ''
          }, 2000)

        })
      )
    }
  })

}) // end of DOMContentLoaded
