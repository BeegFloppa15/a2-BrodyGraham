let problemMap = new Map();

// TODO: Add some more problems
problemMap.set("2 + 2", [4]);
problemMap.set("Square root of 144", [12]);
problemMap.set("6 x 7", [42])
problemMap.set("6 x 9", [72])
problemMap.set("5 to the power of 3", [125])
problemMap.set("Life, the universe, everything", [42])


function randomProblem(){
    let index = parseInt(Math.random() * problemMap.size)
    console.log(`Map size = ${problemMap.size}, rand index = ${index}`)
    return [...problemMap.keys()][index]
}

module.exports = { problemMap, randomProblem }