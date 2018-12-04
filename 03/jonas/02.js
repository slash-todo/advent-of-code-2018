const claims = require("./input.js");

const mapTiles = (claim, cb) => {
  for (let x = claim.left; x <= claim.right; x++) {
    for (let y = claim.top; y <= claim.bottom; y++) {
      const coord = x + "," + y;
      cb(coord);
    }
  }
};

const tiles = {};
claims.forEach(claim =>
  mapTiles(claim, coord => (tiles[coord] = (tiles[coord] || 0) + 1))
);

const cleanTile = claims.find(claim => {
  let clean = true;
  mapTiles(claim, coord => {
    if (tiles[coord] > 1) {
      clean = false;
    }
  });
  return clean;
});

console.log(cleanTile);
