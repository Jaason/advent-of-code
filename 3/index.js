const fs = require('fs');

// Combined regex to match do(), don't(), or mul(number, number)
const combinedPattern = /\bdo\(\)|\bdon't\(\)|mul\((\d+),\s*(\d+)\)/g;

function processFile(filename) {
  fs.readFile(filename, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }

    let enabled = true; // Initial state: mul instructions are enabled
    let totalSum = 0;
    let match;

    // Process all matches in the input data
    while ((match = combinedPattern.exec(data)) !== null) {
      if (match[0] === 'do()') {
        // Enable future mul instructions
        enabled = true;
        console.log('do() => mul enabled');
      } else if (match[0] === "don't()") {
        // Disable future mul instructions
        enabled = false;
        console.log("don't() => mul disabled");
      } else if (match[0].startsWith('mul') && enabled) {
        // Valid mul instruction with numbers
        const num1 = parseInt(match[1], 10);
        const num2 = parseInt(match[2], 10);
        const product = num1 * num2;
        totalSum += product;
        console.log(`Found: ${match[0]} => ${num1} x ${num2} = ${product}`);
      } else if (match[0].startsWith('mul') && !enabled) {
        console.log(`Skipping: ${match[0]} (mul disabled)`);
      }
    }

    // Output the final result
    console.log('Total Sum of All Multiplications:', totalSum);
  });
}

// Run the function with the input file
processFile('input.txt');
