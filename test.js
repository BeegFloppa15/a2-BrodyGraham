const Player = require('./player')

let leaderboard = new Player.Leaderboard()

leaderboard.board.push(new Player.Player("grungus12", 13, 6))
leaderboard.board.push(new Player.Player("bingus 11", 9, 8))
leaderboard.board.push(new Player.Player("Joe 13", 9, 0))

console.log(leaderboard.board)

leaderboard.sortLeaderboard()

console.log(leaderboard.board)