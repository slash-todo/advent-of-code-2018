const nums = require("./input");

let found = false;
let freqs = [0];
let freq = 0;

while (!found) {
  for (const num of nums) {
    freq += num;
    if (freqs.includes(freq)) {
      console.log(freq);
      found = true;
      break;
    } else {
      freqs.push(freq);
    }
  }
}
