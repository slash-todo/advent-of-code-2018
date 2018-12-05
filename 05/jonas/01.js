const input = require("./input");
const { tail, areReactive } = require("./utils");

const result = input.reduce((acc, char) => {
  if (acc.length === 0 || !areReactive(tail(acc), char)) {
    acc.push(char);
  } else {
    acc.pop();
  }
  return acc;
}, []);

console.log(result.length);
