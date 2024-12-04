const fs = require("fs");
const path = require("path");

// Load the input string from input.txt
const inputFilePath = path.join(__dirname, "input.txt");
const inputString = fs.readFileSync(inputFilePath, "utf-8").trim();

// Process the input into a 2D grid
const grid = inputString.split("\n").map(row => row.split(""));
const rowsCount = grid.length;
const colsCount = grid[0].length;

// Word to search for
const word = "XMAS";
const wordLength = word.length;

// Directions to move in the grid
const directions = [
  [0, 1],   // Right
  [0, -1],  // Left
  [1, 0],   // Down
  [-1, 0],  // Up
  [1, 1],   // Diagonal right-down
  [-1, -1], // Diagonal left-up
  [1, -1],  // Diagonal left-down
  [-1, 1]   // Diagonal right-up
];

// Function to check for the word starting from a given position and direction
function checkWord(x, y, dx, dy) {
  for (let i = 0; i < wordLength; i++) {
    const nx = x + i * dx;
    const ny = y + i * dy;
    if (nx < 0 || nx >= rowsCount || ny < 0 || ny >= colsCount || grid[nx][ny] !== word[i]) {
      return false;
    }
  }
  return true;
}

// Main logic to search for the word
const matches = [];
let totalMatches = 0;

for (let row = 0; row < rowsCount; row++) {
  for (let col = 0; col < colsCount; col++) {
    for (const [dx, dy] of directions) {
      if (checkWord(row, col, dx, dy)) {
        matches.push({ start: [row, col], direction: [dx, dy] });
        totalMatches++;
      }
    }
  }
}

// Output results
console.log(`Found ${totalMatches} occurrences of the word 'XMAS':`);
// matches.forEach(match => {
//   console.log(`Start: (${match.start[0]}, ${match.start[1]}), Direction: (${match.direction[0]}, ${match.direction[1]})`);
// });
