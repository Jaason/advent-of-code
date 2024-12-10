const fs = require("fs");
const path = require("path");

// Load the input string from input.txt
const inputFilePath = path.join(__dirname, "input.txt");
const inputString = fs.readFileSync(inputFilePath, "utf-8").trim();

// Process the input into a 2D grid
const grid = inputString.split("\n").map(row => row.split(""));
const rowsCount = grid.length;
const colsCount = grid[0].length;

// Define the relative positions for the "X-MAS" pattern
const xMasOffsets = [
  // First arm of the "X": Top-left to bottom-right
  [[-1, -1], [0, 0], [1, 1]],
  // Second arm of the "X": Top-right to bottom-left
  [[-1, 1], [0, 0], [1, -1]],
];

// Function to check if a single arm matches a word
function matchesWord(x, y, offsets, word) {
  return offsets.every(([dx, dy], i) => {
    const nx = x + dx;
    const ny = y + dy;
    return (
      nx >= 0 &&
      ny >= 0 &&
      nx < rowsCount &&
      ny < colsCount &&
      grid[nx][ny] === word[i]
    );
  });
}

// Function to check if an X-MAS pattern exists at position (x, y)
function isXMas(x, y) {
  let found = 0;
  // Iterate over the two arms of the "X"
  for (const [arm1, arm2] of [[xMasOffsets[0], xMasOffsets[1]]]) {
    // Check all combinations of forwards and backwards "MAS"
    for (const arm1Word of ["MAS", "SAM"]) {
      for (const arm2Word of ["MAS", "SAM"]) {
        const arm1Matches = matchesWord(x, y, arm1, arm1Word);
        const arm2Matches = matchesWord(x, y, arm2, arm2Word);

        if (arm1Matches && arm2Matches) {
          found++;
        }
      }
    }
  }
  return found;
}

// Main logic to count all X-MAS patterns in the grid
let totalMatches = 0;

for (let row = 0; row < rowsCount; row++) {
  for (let col = 0; col < colsCount; col++) {
    totalMatches += isXMas(row, col);
  }
}

// Output results
console.log(`Found ${totalMatches} occurrences of the "X-MAS" pattern.`);
