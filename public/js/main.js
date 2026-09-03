// FRONT-END (CLIENT) JAVASCRIPT HERE
// Declaring html element here so we can access it in all fucntions (i think)
let ul = null;
let currentProblem = null;
let problemElement = null;
let leaderboardTable = null;
let username = ""

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  
  const input = document.querySelector( '#answer' ),
  //this is userData on the server
        json = { 
          username: username,
          problem: currentProblem,
          answer: input.value },
        body = JSON.stringify( json )

  const response = await fetch( '/submit', {
    method:'POST',
    body 
  })

  input.value = ""

  //Recieve JSON data from the server
  const data = await response.json();
  console.log( 'text:', data );

  updateLeaderboard(data['all-players'])

  if (data.problem !== undefined){
    // TODO : Do some cool effect to show if they got problem right or wrong
    currentProblem = data.problem
    problemElement.innerText = data.problem
  }

}

const start = async function(event){
  event.preventDefault()
  const nameInput = document.querySelector("#username")
  username = nameInput.value

  let menus = Array.from(document.getElementsByClassName("menu-element"))
  menus.map((element) => element.hidden = true)
  let game = Array.from(document.getElementsByClassName("game-element"))
  game.map((element) => element.hidden = false)

  // const problemSec = document.getElementById("problem-section")
  // problemSec.hidden = false
  // const leaderBoardSec = document.getElementById("leaderboard-section")
  // leaderBoardSec.hidden = false

  let problemText = await requestNewProblem()
  problemElement.innerText = problemText
}

function updateLeaderboard(allPlayers){
  leaderboardTable.innerHTML = ""
  for (let i = 0; i < allPlayers.length; i++){
    //TODO: Display percentage as actual percentage
    leaderboardTable.innerHTML += `<tr>
            <td>${i + 1}</td>
            <td>${allPlayers[i].username}</td>
            <td>${allPlayers[i].correctGuesses}</td>
            <td>${allPlayers[i].totalGuesses}</td>
            <td>${allPlayers[i].percentage}</td>
          </tr>`
  }
}

async function requestNewProblem(){
  const response = await fetch('/new-problem',{method: "GET"})

  // Problem is a string that represents the problem the user will get. 
  let temp = await response.json()
  currentProblem = temp.problem
  console.log(currentProblem)
  updateLeaderboard(temp.leaderboard)
  return currentProblem
}

function back(){
  currentProblem = null
  username = ""

  let menus = Array.from(document.getElementsByClassName("menu-element"))
  menus.map((element) => element.hidden = false)
  let game = Array.from(document.getElementsByClassName("game-element"))
  game.map((element) => element.hidden = true)
}

window.onload = function() {
  const startButton = document.querySelector('#start')
  startButton.onclick = start
  const backButton = document.querySelector("#back")
  backButton.onclick = back

  const submitButton = document.getElementById('submit')
  submitButton.onclick = submit

  problemElement = document.getElementById('problem')

  leaderboardTable = document.querySelector('#leaderboard-players')

  //Creating html element and adding it to the body
  ul = document.createElement('ul');
  document.body.appendChild(ul);
}
