let imageId = 1221; //Enter the id from the fetched image here
const imageURL = `https://randopic.herokuapp.com/images/${imageId}`;
const commentsURL = `https://randopic.herokuapp.com/comments/`;

let image = document.querySelector("img");
let imageName = document.getElementById("name");
let likesSpan = document.getElementById("likes");
let ul = document.querySelector("ul");
const form = document.querySelector("form");
fetchAndDisplayData();

function displayData(response) {
  const imageData = response;
  image.src = `${imageData.url}`;
  image.id = `${imageData.id}`;
  imageName.innerText = `${imageData.name}`;
  likesSpan.innerText = `${imageData.like_count}`;
  imageData.comments.forEach(comment => {
    ul.innerHTML += `<li>${comment.content}</li>`;
  });
}

function fetchAndDisplayData() {
  fetch(imageURL)
    .then(response => response.json())
    .then(function(response) {
      console.log(response);
      displayData(response);
    });
}

function increaseLikes() {
  if (event.target.className === "like_button") {
    // why does this also need to be declared in here when it's already a global variable???
    let likesSpan = document.getElementById("likes"); //???
    // why does this also need to be declared in here when it's already a global variable???
    likesSpan.innerText = parseInt(likesSpan.innerText) + 1;

    fetch(`https://randopic.herokuapp.com/likes`, {
      method: "POST",
      body: JSON.stringify({ image_id: 1221 }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(function() {
      fetch(imageURL).then(response => response.json());
    });
  }
}

document.addEventListener("click", increaseLikes);
