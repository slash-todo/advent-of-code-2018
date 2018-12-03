const ids = require("./input");

let twos = 0;
let threes = 0;

ids.forEach(id => {
  let letters = {};
  id.split("").forEach(
    letter => (letters[letter] = (letters[letter] || 0) + 1)
  );
  if (Object.values(letters).includes(2)) {
    twos++;
  }
  if (Object.values(letters).includes(3)) {
    threes++;
  }
});

console.log(twos * threes);
