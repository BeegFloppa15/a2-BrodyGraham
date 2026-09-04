let problemMap = new Map();

// TODO: Add some more problems
problemMap.set("2 + 2", [4]);
problemMap.set("Square Root of 144", [12]);

function randomProblem(){
    let index = parseInt(Math.random() * problemMap.size)
    console.log(`Map size = ${problemMap.size}, rand index = ${index}`)
    return [...problemMap.keys()][index]
}

module.exports = { problemMap, randomProblem }