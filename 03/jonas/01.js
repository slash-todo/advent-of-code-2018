const claims = require("./input.js");

const tiles = {};
claims.forEach(claim => {
  for (let x = claim.left; x <= claim.right; x++) {
    for (let y = claim.top; y <= claim.bottom; y++) {
      const coord = x + "," + y;
      tiles[coord] = (tiles[coord] || 0) + 1;
    }
  }
});

console.log(Object.values(tiles).filter(count => count > 1).length);
