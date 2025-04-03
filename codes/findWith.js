import fruits from "./data.mjs";

// Define the criteria to search for
const criterias = { color: "Red", skin: "has-skin" };

// Function to find fruits that match at least one criteria
function findFruitsWithCriteria(fruits, criterias) {
  const matchingFruits = [];

  for (const fruit of fruits) {
    // Check if the fruit matches at least one criteria
    for (const [key, value] of Object.entries(criterias)) {
      if (fruit[key] === value) {
        matchingFruits.push(fruit);
        break; // Stop checking other criteria for this fruit
      }
    }
  }

  return matchingFruits;
}

// Find fruits that match the criteria
const result = findFruitsWithCriteria(fruits, criterias);

// Output the matching fruits
console.log("Fruits matching at least one criteria:", result);
