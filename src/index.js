let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

//GET toys
document.addEventListener("DOMContentLoaded", getToys)

function getToys(){
  fetch('http://localhost:3000/toys')
    .then((resp) => resp.json())
    .then((toys) => {
      const collection = document.querySelector('#toy-collection')
      toys.forEach((toy) => {
        const toyDiv = document.createElement('div')
        toyDiv.className = 'card'
        toyDiv.innerHTML = `
          <h2 id=${toy.id}>${toy.name}</h2>
          <img class='toy-avatar' src='${toy.image}'>
          <p>${toy.likes}</p>
          <button class='like-btn'>Like ❤️</button>
        `
        collection.appendChild(toyDiv)
        listenOnLikeBtns()
      })
    })
}

//POST toys

const toyForm = document.querySelector('.add-toy-form')
toyForm.addEventListener('submit',handleNewToy)

function handleNewToy(e){
  e.preventDefault()
  const name = e.target[0].value
  const url = e.target[1].value
  postToy(name, url)
  getToys()

}

function postToy(name, url){
  fetch('http://localhost:3000/toys', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body:
      JSON.stringify({
        name: name,
        image: url,
        likes: 0
    })
    
  })
}

//PATCH toys

function listenOnLikeBtns(){
  const likeButtons = document.querySelectorAll('.like-btn')
  likeButtons.forEach((button) => {
    button.addEventListener('click', handleLike)
  })
}

function handleLike(e){
  let toyId = e.target.parentNode.querySelector('h2').id
  let toyLikes = parseInt(e.target.parentNode.querySelector('p').innerText, 10)
  toyLikes += 1
  e.target.parentNode.querySelector('p').innerText = toyLikes
  
  fetch(`http://localhost:3000/toys/${toyId}`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      likes: toyLikes
    })
  })
}

