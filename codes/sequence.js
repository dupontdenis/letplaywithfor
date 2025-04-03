import fruits from "./data.mjs";

// Define the target sequence of fruits to search for
const targetSequence = ["Grapes", "Apple", "Orange"];

/**
 * Finds the sequence of fruits in the list.
 * @param {Array<string>} targetSequence - The ordered sequence of fruit names to find.
 * @param {Array<Object>} fruits - The list of fruit objects.
 * @returns {Object|null} - The start and end indices of the sequence, or null if not found.
 */
const findSequence = function (targetSequence, fruits) {
  const totalFruits = fruits.length; // Total number of fruits in the list
  const sequenceLength = targetSequence.length; // Length of the target sequence to find
  let isFound = false; // Flag to indicate if the sequence is found
  let startIndex = 0; // Current starting index in the fruits list

  // Iterate through the fruits list to find the target sequence
  while (startIndex <= totalFruits - sequenceLength && !isFound) {
    let sequenceIndex = 0; // Index in the target sequence to match

    // Check if the target sequence matches starting at the current index
    while (
      sequenceIndex < sequenceLength &&
      targetSequence[sequenceIndex] === fruits[startIndex + sequenceIndex].name
    ) {
      sequenceIndex += 1;
    }

    // If the entire target sequence is matched, set isFound to true
    if (sequenceIndex === sequenceLength) {
      isFound = true;
      return {
        startIndex: startIndex,
        endIndex: startIndex + sequenceLength - 1,
      }; // Return the start and end indices
    }

    // Move to the next starting position
    startIndex += 1;
  }

  // If the target sequence is not found, return null
  return null;
};

// Example usage
const result = findSequence(targetSequence, fruits);

if (result) {
  console.log(
    `Target sequence found from index ${result.startIndex} to ${result.endIndex}`
  );
} else {
  console.log("Target sequence not found.");
}

console.log("----");
