const ids = require("./input");

let found = false;
let i = 0;
while (!found && i < ids.length) {
  for (let j = 0; j < ids.length; j++) {
    let sameLetters = [];
    for (let k = 0; k < ids[i].length; k++) {
      if (ids[i][k] === ids[j][k] && i !== j) {
        sameLetters.push(ids[i][k]);
      }
    }
    if (sameLetters.length >= ids[i].length - 1) {
      console.log(sameLetters.join(""));
      found = true;
      break;
    }
  }
  i++;
}
