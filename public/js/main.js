// FRONT-END (CLIENT) JAVASCRIPT HERE
// Declaring html element here so we can access it in all fucntions (i think)
let ul = null;
let currentProblem = null;
let problemElement = null;

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  
  const input = document.querySelector( '#answer' ),
  //TODO: name entry
  //this is userData on the server
        json = { 
          username: "",
          problem: currentProblem,
          answer: input.value },
        body = JSON.stringify( json )

  const response = await fetch( '/submit', {
    method:'POST',
    body 
  })

  //Recieve JSON data from the server
  const data = await response.json();
  console.log( 'text:', data );

  // TODO: Figure out good way to display player stats on the page
  const li = document.createElement('li')
  li.innerText = JSON.stringify(data.user)
  ul.appendChild(li)

}

const start = async function(event){
  event.preventDefault()
  let problemText = await requestNewProblem()
  problemElement.innerText = problemText
}

async function requestNewProblem(){
  const response = await fetch('/new-problem',{method: "GET"})

  // Problem is a string that represents the problem the user will get. 
  currentProblem = await response.text()
  console.log(currentProblem)
  return currentProblem
}

window.onload = function() {
  const startButton = document.querySelector('button')
  startButton.onclick = start

  const submitButton = document.getElementById('submit')
  submitButton.onclick = submit

  problemElement = document.getElementById('problem')

  //Creating html element and adding it to the body
  ul = document.createElement('ul');
  document.body.appendChild(ul);
}
