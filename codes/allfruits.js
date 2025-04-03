import fruits from "./data.mjs";

// Initialize an empty basket to store selected fruits
const basket = [];

// Iterate through the list of fruits
for (const fruit of fruits) {
  console.log(`Checking fruit: ${fruit.name}`);

  // Add the fruit to the basket if it's an Apple
  if (fruit.name === "Apple") {
    basket.push(fruit);
    console.log(`Added ${fruit.name} to the basket.`);
  }
}

// Display the total number of fruits in the basket
console.log(`The number of fruits in the basket is: ${basket.length}`);
console.log("----");
