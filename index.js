const fs = require("fs");

// Read the input file
fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }

  // Split the content by lines
  const lines = data.trim().split("\n");

  // Initialize arrays
  const array1 = [];
  const array2 = [];

  // Parse each line
  lines.forEach((line) => {
    const [value1, value2] = line.split(/\s+/).map(Number); // Split by space and convert to numbers
    if (!isNaN(value1)) array1.push(value1);
    if (!isNaN(value2)) array2.push(value2);
  });

  // Sort both arrays
  array1.sort((a, b) => a - b);
  array2.sort((a, b) => a - b);

  // Calculate the sum of differences
  let result = 0;
  for (let i = 0; i < Math.min(array1.length, array2.length); i++) {
    const diff = Math.abs(array1[i] - array2[i]); // Subtract smaller from larger
    result += diff; // Add to the result
  }

  console.log("Sorted Array 1:", array1);
  console.log("Sorted Array 2:", array2);
  console.log("Result of sum of differences:", result);

  // Create a Map to store the counts
  const numberCounts = new Map();

  // Iterate over array2 and count occurrences
  array2.forEach((num) => {
    if (numberCounts.has(num)) {
      // Increment the count if the number is already in the map
      numberCounts.set(num, numberCounts.get(num) + 1);
    } else {
      // Initialize the count if the number is not in the map
      numberCounts.set(num, 1);
    }
  });

  // Log the counts
  console.log("Number counts in array2:");
  numberCounts.forEach((count, num) => {
    console.log(`${num}: ${count}`);
  });

  console.log(`Total unique numbers: ${numberCounts.size}`);

  // Initialize the similarity score
  let similarityScore = 0;

  // Iterate over array1 and calculate the score
  array1.forEach((num) => {
    const countInArray2 = numberCounts.get(num) || 0; // Default to 0 if not found
    similarityScore += num * countInArray2; // Multiply and add to the score
  });

  console.log(`Similarity Score: ${similarityScore}`);
});
