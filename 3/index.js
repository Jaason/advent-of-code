const fs = require('fs'); // File system module to read files

// Regular expression to find valid mul(number, number) patterns
const pattern = /[^a-zA-Z0-9]*mul\((\d+),\s*(\d+)\)/g;

// Function to process the input file
function processFile(filename) {
  // Read the file content
  fs.readFile(filename, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }

    // Find all matches using the regex
    let match;
    let totalSum = 0;

    while ((match = pattern.exec(data)) !== null) {
      // Extract the numbers from the match
      const num1 = parseInt(match[1], 10); // First number
      const num2 = parseInt(match[2], 10); // Second number

      // Multiply and add to the total sum
      const product = num1 * num2;
      totalSum += product;
      console.log(`Found: ${match[0]} => ${num1} x ${num2} = ${product}`);
    }

    // Output the final result
    console.log('Total Sum of All Multiplications:', totalSum);
  });
}

// Run the function with the input file
processFile('input.txt');
