document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta');

  let imageId = '1223';

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`;

  const likeURL = `https://randopic.herokuapp.com/likes/`;

  const commentsURL = `https://randopic.herokuapp.com/comments/`;

  function fetchAndRender() {
    fetch(imageURL)
      .then(resp => resp.json())
      .then(data => {
        image = data;
        createImageCard(image);
      });
  }
  fetchAndRender();

  function createImageCard(image) {
    imageCard = document.getElementById('image_card');
    likeButton = document.getElementById('like_button');
    card = document.createElement('span');
    card.innerHTML = `
    <img src="${image.url}" id="image" data-id="${image.id}"/>
    <h4 id="name">${image.name}</h4>
    <span>Likes:
    <span id="likes">${image.like_count}</span>
    </span>
    `;
    imageCard.insertBefore(card, likeButton);
    commentList(image);
  }

  function commentList(image) {
    imageCommentList = document.getElementById('comments');
    image.comments.forEach(comment => {
      imageCommentList.innerHTML += `
      <li id=${comment.id} image_id=${comment.image_id}>${comment.content}</li>
      `;
    });
  }

  let likeButtonListener = document.getElementById('like_button');
  likeButtonListener.addEventListener('click', function(event) {
    // document.addEventListener('click', function(event) {
    if (event.target.id === 'like_button') {
      event.preventDefault();
      fetch(likeURL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          image_id: 1223
        })
      }).then(stuff => {
        likeCount = document.getElementById('likes');
        newLikeCount = parseInt(likeCount.innerHTML) + 1;
        likeCount.innerHTML = newLikeCount;
      });
    }
    // else if ((event.target.type = 'submit')) {
    //   event.preventDefault()
    //   console.log(event.target);
    // }
  });

  let form = document.querySelector('form');
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    words = event.target.comment.value;
    let commentList = document.getElementById('comments');
    let newComment = document.createElement('li');
    newComment.innerText = words;
    commentList.appendChild(newComment);
    // persistComment(words, commentList);
  });

  function persistComment(words) {
    fetch(commentsURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: 1223,
        content: words
      })
    })
      .then(data => {
        card.innerHTML = '';
        commentList.innerHTML = '';
      })
      .then(fetchAndRender);
  }
});
