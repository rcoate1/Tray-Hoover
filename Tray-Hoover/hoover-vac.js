'use strict'

//declare variables
const fs = require('fs')
let dirtCleaned = 0;

//read local input file for input data splitting on returns
const inputs = fs.readFileSync('./input.txt').toString().split(/\r\n|\n/);

//define grid limits
const gridLimits = inputs.slice(0)[0].split(" ");
const grid = {
    x: parseInt(gridLimits[0]),
    y: parseInt(gridLimits[1]),
};
console.log('the input grid size is:', grid.x, grid.y);

//define clean grid board
grid.board = (new Array(grid.y).fill('.').map(e => new Array(grid.x).fill('.')));

//define starting position
const start = inputs.slice(1)[0].split(" ");
const position = {
    x: parseInt(start[0]),
    y: parseInt(start[1]),
}
console.log('initial hoover start location is:', position.x, position.y);

//define movements 
const movements = inputs.slice(-1)[0].split("");
console.log('movements to be performed are:', movements.toString());

//define dirt patch positions
const dirtPatches = inputs.slice(2, -1).map(patch => patch.split(" "));

//set dirt patches on grid board
dirtPatches.forEach(dirtPatch => {
    const x = dirtPatch[0];
    const y = dirtPatch[1];
    grid.board[y][x] = 'd';
});

//loop through array of movements checking for dirt to clean
movements.forEach(movement => {
    nextMove(movement); 
    if (grid.board[position.y][position.x] === "d") {
        dirtCleaned++;
        grid.board[position.y][position.x] = '.';        
    }
});

function nextMove(direction) {
    if (direction === 'N' && position.y < grid.y - 1) position.y++;
    if (direction === 'S' && position.y > 0) position.y--;
    if (direction === 'E' && position.x < grid.x - 1) position.x++;
    if (direction === 'W' && position.x > 0) position.x--;
    return position;
}

//log and return requested outputs
console.log('final hoover positon is:', position.x, position.y);
console.log('total dirt cleaned is:', dirtCleaned);

//reverse grid orientation to position 0,0 in bottom-left for readable view
grid.board = grid.board.reverse();
console.log('hoover cleaned grid:',grid.board);
