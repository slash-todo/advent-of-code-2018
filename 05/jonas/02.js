const input = require("./input");
const { tail, areReactive, areSameLetter } = require("./utils");

const results = "abcdefghijklmnopqrstuvwxyz".split("").map(base =>
  input
    .filter(char => !areSameLetter(char, base))
    .reduce((acc, char) => {
      if (acc.length === 0 || !areReactive(tail(acc), char)) {
        acc.push(char);
      } else {
        acc.pop();
      }
      return acc;
    }, [])
);

console.log(results.sort((arr1, arr2) => arr1.length - arr2.length)[0].length);
