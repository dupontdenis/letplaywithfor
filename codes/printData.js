import fruits from "./data.mjs";

for (const fruit of fruits) {
  const { name, emoji, color, seed } = fruit;
  console.log(`Name: ${name}, Emoji: ${emoji}, Color: ${color}, Seed: ${seed}`);
}
