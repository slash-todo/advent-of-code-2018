const input = require("./input");
const { tail, areReactive } = require("./utils");

const result = input.reduce((acc, char) => {
  tail(acc) && areReactive(tail(acc), char) ? acc.pop() : acc.push(char);
  return acc;
}, []);

console.log(result.length);
