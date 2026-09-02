class Player{
    constructor(user, total, correct){
        this.username = user;
        this.totalGuesses = total;
        this.correctGuesses = correct;
        this.percentage = total/correct;
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

module.exports = {Player}