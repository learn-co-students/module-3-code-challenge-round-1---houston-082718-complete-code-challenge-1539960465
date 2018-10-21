document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 1225; //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  getImage();
  
  // ## Step 1 - Get the Image Data
  function getImage() {
    fetch(`https://randopic.herokuapp.com/images/${imageId}`)
    .then(response => response.json())
    .then(showImage)
  }

  function showImage(img) {
    const image = document.getElementById('image');
    image.src = img.url;
    image.dataset.id = img.id;

    const name = document.getElementById('name');
    name.innerText = img.name;

    const likes = document.getElementById('likes');
    likes.innerText = img.like_count;

    const comments = document.getElementById('comments');
    img.comments.forEach((comment) => {
      comments.innerHTML += `<li>${comment.content} <button class="delete" data-id="${comment.id}">x</button></li>`;
    })
  } //function showImage

  // ## Step 2 - Like Feature (Frontend)
  const likeButton = document.getElementById('like_button');
  likeButton.addEventListener('click', (event) => {
    event.preventDefault();
    const likes = document.getElementById('likes');
    likes.innerText = parseInt(likes.innerText) + 1
    updateImageLikes()    
  }) //click like button

  // ## Step 3 - Like Feature (Backend)
  function updateImageLikes() {
    fetch('https://randopic.herokuapp.com/likes', {
      method: 'POST',
      body: JSON.stringify({
        image_id: imageId
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
  } // function updateImageLikes

  // ## Step 4 - Comment Feature (Frontend)
  const submitButton = document.getElementById('submit');
  submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    const commentInput = document.getElementById('comment_input');
    const comments = document.getElementById('comments');
    comments.innerHTML += `
      <li>${commentInput.value} 
        <button class="delete">x</button>
      </li>`
    createComment(commentInput.value)
    commentInput.parentNode.reset();
  }) //click submit button

  // ## Step 5 - Comment Feature (Backend)
  function createComment(comment) {
    fetch('https://randopic.herokuapp.com/comments', {
      method: 'POST',
      body: JSON.stringify({
        image_id: imageId,
        content: comment
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then((comment) => {
      const comments = document.getElementById('comments');
      let lastComment = comments.lastChild;
      lastButton = lastComment.querySelector('button');
      lastButton.setAttribute('data-id', comment.id);
    })
  } //function createComment

  // ## Step 6 - Delete a comment feature (Frontend)
  const comments = document.getElementById('comments')
  comments.addEventListener('click', (event) => {
    event.preventDefault();
    if(event.target.className === 'delete') {
      let li = event.target.parentNode;
      li.parentNode.removeChild(li)
      deleteComment(event.target.dataset.id)
    }
  }) //click delete button
  
  // Delete a comment feature (Backend)
  function deleteComment(id) {
      fetch(`https://randopic.herokuapp.com/comments/${id}`, {
        method: 'DELETE'
      })
  } //function deleteComment
})
