class Player{
    constructor(user, total, correct){
        this.username = user;
        this.totalGuesses = total;
        this.correctGuesses = correct;
        this.percentage = correct/total;
    }

    toString(){
        return JSON.stringify(this.jsonify())
    }

    jsonify(){
        return {
            username: `${this.username}`,
            totalGuesses: `${this.totalGuesses}`,
            correctGuesses: `${this.correctGuesses}`,
            percentage: `${this.correctGuesses / this.totalGuesses}`
        }
    }
}

class Leaderboard{
    constructor(){
        this.board = new Map();
    }

    sortLeaderboard(){
        let presort = [...this.board.values()]
        console.log("List of entries before sorting:" + presort)

        let postsort = presort.sort((a, b) => parseInt(a.correctGuesses) - parseInt(b.correctGuesses))
        console.log("List of entries AFTER sorting:" + postsort)
        console.log("2nd Element: " + postsort[1])

        let tempBoard = new Map()
        for (let user in postsort){
            console.log(`Attempting to set ${user.username} to ${user.toString()}`)
            tempBoard.set(user.username, user)
        }
        this.board = tempBoard
    }
}

module.exports = {Player, Leaderboard}