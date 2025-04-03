import fruits from "./data.mjs";

// Define the target basket of fruits to search for
const basquet = ["Grapes", "Orange"];

/**
 * Checks if all fruits in the basquet are included in the fruits list.
 * @param {Array<string>} basquet - The list of fruit names to check.
 * @param {Array<Object>} fruits - The list of fruit objects.
 * @returns {boolean} - True if all fruits in the basquet are found, otherwise false.
 */
function isBasquetIncluded(basquet, fruits) {
  let basquetIndex = 0;
  let allFound = true; // Flag to track if all fruits are found

  // Iterate through the basquet using a while loop
  while (basquetIndex < basquet.length && allFound) {
    const currentFruit = basquet[basquetIndex];
    let isFound = false;
    let fruitIndex = 0;

    // Check if the current fruit in the basquet exists in the fruits list
    while (fruitIndex < fruits.length && !isFound) {
      if (fruits[fruitIndex].name === currentFruit) {
        isFound = true; // Mark as found
      }
      fruitIndex++;
    }

    // Update the `allFound` flag if the fruit is not found
    if (!isFound) {
      allFound = false;
    }

    // Move to the next fruit in the basquet
    basquetIndex++;
  }

  // Return whether all fruits in the basquet were found
  return allFound;
}

// Check if the basquet is included
const result = isBasquetIncluded(basquet, fruits);

if (result) {
  console.log("The basket is included in the fruits list.");
} else {
  console.log("The basket is NOT included in the fruits list.");
}
