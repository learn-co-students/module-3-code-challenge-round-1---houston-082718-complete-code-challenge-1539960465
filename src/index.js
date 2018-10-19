document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 1230 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

fetch("https://randopic.herokuapp.com/images/1230")
  .then(resp => resp.json())
  .then(json => addImageToPage(json))


 function addImageToPage(image) {}
const newImagetr = document.createElement("tr");
newImagetr.id = image.id
newImagetr.innerHTML = `
<tr>
  <td>${image.url}</td>
  <td>${image.name}</td>
  <td>${image.likes}</td>
  <td><ul><li>Comments</li></ul></td>
</tr>
`
image_card.append(newImagetr)
};})

function likefeature()
