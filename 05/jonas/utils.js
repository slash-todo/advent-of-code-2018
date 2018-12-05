const tail = arr => arr[arr.length - 1];

const isLowerCase = str => str === str.toLowerCase();

const isUpperCase = str => !isLisLowerCase(str);

const areOppositeCase = (str1, str2) => isLowerCase(str1) !== isLowerCase(str2);

const areSameLetter = (char1, char2) =>
  char1.toLowerCase() === char2.toLowerCase();

const areReactive = (char1, char2) =>
  areSameLetter(char1, char2) && areOppositeCase(char1, char2);

module.exports = {
  tail,
  isLowerCase,
  isUpperCase,
  areOppositeCase,
  areSameLetter,
  areReactive
};
