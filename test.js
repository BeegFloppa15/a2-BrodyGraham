let successJSON = {
    problem: "2 + 2",
    user: {
        fuck: "bruh",
        shit: "15"
    }
}

let failJSON = {
    user: {
        fuck: "WEEE",
        shit: "27"
    }
}

console.log(successJSON.problem)
console.log(successJSON.user.fuck)
console.log(failJSON.problem)
console.log(failJSON.user.fuck)
