document.addEventListener('DOMContentLoaded', () => {


  let imageId = 1228 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  getImage(imageURL);
  addLikeListener(likeURL);
  addCommentListener(commentsURL);



})

function getImage(img) {
  fetch(img).then(resp => resp.json()).then(displayImgData);
}

function displayImgData(img) {
  let imgCard = getImageCard();
  imgCard.children[0].src = img.url
  getLikes().innerHTML = img.like_count;
  getLikes().dataset.likes = img.like_count;
  imgCard.children[0].dataset.id = img.id;
  let commentList = getCommentList();
  img.comments.forEach(comment => {
    commentList.innerHTML += `<li data-comment-id="${comment.id}">${comment.content}  <button class="delete-btn">Delete</button></li>`
  });




}

function getImageCard() {
  return document.querySelector('#image_card');
}

function getLikes() {
  return getImageCard().children[2].children[0];
}

function addLikeListener(URL) {
  const likeButton = getImageCard().children[3];
  likeButton.addEventListener('click', event => {
    like(URL);
  })

}

function like(URL) {

  let numLikes = getLikes().dataset.likes;
  numLikes++;
  getLikes().innerHTML = numLikes;
  getLikes().dataset.likes = numLikes;

  let data = {
    image_id: getImageCard().children[0].dataset.id
  }

  fetch(URL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

}

function addCommentListener(URL) {
  const commentButton = getImageCard().children[4];
  commentButton.addEventListener('submit', event => {
    comment(event, URL);
  })
}

function comment(e, URL) {
  e.preventDefault();
  getCommentList().innerHTML += `<li>${e.target.comment.value}  <button data-comment-id="${comment.id}" class="delete-btn">Delete</button></li>`

  let data = {
    image_id: getImageCard().children[0].dataset.id,
    content: e.target.comment.value
  }

  fetch(URL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  getImageCard().children[4].reset();
}

function getCommentList() {
  return getImageCard().children[5];
}
