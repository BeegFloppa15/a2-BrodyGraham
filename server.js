const http = require( 'http' ),
      fs   = require( 'fs' ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library if you're testing this on your local machine.
      // On Render, make sure `npm install` is your build command.
      mime = require( 'mime' ),
      problems = require( './problems' )
      Player = require('./player')
      dir  = 'public/',
      port = 3000

const playerData = new Map();

const server = http.createServer( function( request,response ) {
  if( request.method === 'GET' ) {
    handleGet( request, response )    
  }else if( request.method === 'POST' ){
    handlePost( request, response ) 
  }
})

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === '/' ) {
    sendFile( response, 'public/index.html' )
  }
  else if (request.url === '/new-problem'){
    // Get a random problem string
    let currentProblem = problems.randomProblem();

    // Send the current problem string to the client
    console.log("current Problem: " + currentProblem)
    response.writeHeader(200, "OK", {'Content-Type': 'text/plain' })
    response.end(currentProblem)
  }
  else{
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
  let dataString = ''

  // Pull in data until it is complete
  request.on( 'data', function( data ) {
      dataString += data 
  })

  // Once data is complete, parse it
  request.on( 'end', function() {
    let userData = JSON.parse(dataString)
    console.log( userData )
    // ... do something with the data here!!!

    let currPlayer = playerData.get(userData.username)
    let reply

    // Check if the answer is correct
    let answers = problems.problemMap.get(userData.problem)
    if (answers.includes(parseInt(userData.answer))){
      console.log("CORRECT!")

      // Update Player's stats in memory
      if (currPlayer !== undefined){
        currPlayer.totalGuesses += 1;
        currPlayer.correctGuesses += 1;
        currPlayer.percentage = currPlayer.correctGuesses / currPlayer.totalGuesses
      }
      else{
        let newPlayer = new Player.Player(userData.username, 1, 1)
        playerData.set(userData.username, newPlayer)
        currPlayer = newPlayer
      }

      // Serve player data and a new problem
      reply = {
        problem: problems.randomProblem(),
        user: currPlayer.jsonify()
      }
      
    }
    // Answer is wrong
    else {
      console.log("INCORRECT!")

      // Update Player's stats in memory
      if (currPlayer !== undefined){
        currPlayer.totalGuesses += 1;
        currPlayer.percentage = currPlayer.correctGuesses / currPlayer.totalGuesses
      }
      else{
        let newPlayer = new Player.Player(userData.username, 1, 0)
        playerData.set(userData.username, newPlayer)
        currPlayer = newPlayer
      }

      // Serve just the player data
      reply = {
        user: currPlayer.jsonify()
      }

    }

    console.log(`${userData.username} data in memory: ${currPlayer.toString()}`)

    // Send data to the client: includes "problem" if they got it right
    response.writeHead( 200, "OK", {'Content-Type': 'text/plain' })
    response.end(JSON.stringify(reply))
  })
}

const sendFile = function( response, filename ) {
   const type = mime.getType( filename ) 

   fs.readFile( filename, function( err, content ) {

     // if the error = null, then we've loaded the file successfully
     if( err === null ) {

       // status code: https://httpstatuses.com
       response.writeHeader( 200, { 'Content-Type': type })
       response.end( content )

     }else{

       // file not found, error code 404
       response.writeHeader( 404 )
       response.end( '404 Error: File Not Found' )

     }
   })
}

server.listen( process.env.PORT || port )
