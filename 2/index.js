const fs = require("fs");

function checkOrder(numbers) {
  if (numbers.length < 2) return "Too few elements to determine";

  const isAscending = numbers[1] > numbers[0];
  const isDescending = numbers[1] < numbers[0];

  if (!isAscending && !isDescending) {
    return "Not safe (all elements must be strictly increasing or decreasing)";
  }

  for (let i = 1; i < numbers.length; i++) {
    if (isAscending && numbers[i] <= numbers[i - 1]) {
      return "Not safe (not strictly increasing)";
    }
    if (isDescending && numbers[i] >= numbers[i - 1]) {
      return "Not safe (not strictly decreasing)";
    }
  }

  return isAscending ? "Ascending" : "Descending";
}

function checkDifference(numbers, minDifference = 1, maxDifference = 3) {
  for (let i = 1; i < numbers.length; i++) {
    const diff = Math.abs(numbers[i] - numbers[i - 1]);
    if (diff < minDifference || diff > maxDifference) {
      return `Not safe (difference ${diff} is outside [${minDifference}, ${maxDifference}] at index ${
        i - 1
      } and ${i})`;
    }
  }
  return "Safe";
}

function checkOrderAndDifference(numbers) {
  const orderResult = checkOrder(numbers);
  if (
    !orderResult.startsWith("Ascending") &&
    !orderResult.startsWith("Descending")
  ) {
    return orderResult;
  }

  const differenceResult = checkDifference(numbers);
  if (differenceResult !== "Safe") {
    return differenceResult;
  }

  return "Safe";
}

function checkWithOneRemoval(numbers) {
  for (let i = 0; i < numbers.length; i++) {
    const newArray = [...numbers.slice(0, i), ...numbers.slice(i + 1)];
    const orderResult = checkOrder(newArray);
    const differenceResult = checkDifference(newArray);

    if (
      (orderResult.startsWith("Ascending") ||
        orderResult.startsWith("Descending")) &&
      differenceResult === "Safe"
    ) {
      return true;
    }
  }
  return false;
}

function calculateSafe(lines) {
  let safeCount = 0;

  lines.forEach((line, index) => {
    const numbers = line
      .split(/\s+/)
      .map(Number)
      .filter((num) => !isNaN(num));

    let result = checkOrderAndDifference(numbers);

    if (result !== "Safe") {
      const canBeMadeSafe = checkWithOneRemoval(numbers);
      if (canBeMadeSafe) {
        result = "Safe by removing one bad level";
      }
    }

    console.log(`Line ${index + 1}: ${result}`);

    if (result === "Safe" || result === "Safe by removing one bad level") {
      safeCount++;
    }
  });

  console.log(`Total safe lines: ${safeCount}`);
  return safeCount;
}

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }

  const lines = data.trim().split("\n");

  calculateSafe(lines);
});
