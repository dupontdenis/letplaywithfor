import fruits from "./data.mjs";

//find fruit with name "Apple"
//use for of loop
for (const fruit of fruits) {
  console.log(fruit.name);
  if (fruit.name === "Cherry") {
    console.log(fruit);
  }
}

console.log("----");

// Use a while loop with !trouve to stop ASAP
let i = 0;
let trouve = false;

while (i < fruits.length && !trouve) {
  console.log(fruits[i].name);
  // Check if the current fruit is "Cherry"
  if (fruits[i].name === "Cherry") {
    console.log(fruits[i]);
    trouve = true; // Set trouve to true to stop the loop
  }
  i++;
}

// hors programme
const apple = fruits.find((fruit) => fruit.name === "Apple");
