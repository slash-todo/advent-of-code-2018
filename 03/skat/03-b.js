console.clear();
const input = require('./input.js');
// Sample input:
// #1401 @ 432,243: 19x17
// #1 @ 53,238: 26x24

let ticker = 0;

// get all the claims in an array
let claims = input.map(claim => {
    const regex = /#(\d+)\s@\s(\d+),(\d+):\s(\d+)x(\d+)/g;
    const match = regex.exec(claim);
    return {
        id: Number(match[1]),
        x: Number(match[2]),
        y: Number(match[3]),
        w: Number(match[4]),
        h: Number(match[5])
    };
});

// Make a piece of fabric to track
let fabric = new Uint8ClampedArray(1000 * 1000);

// 2d to 1d convertor
function getCell(x, y) {
    return y * 1000 + x;
}

// make the fabric cells each time an elf claims them
claims.forEach(claim => {
    for (let x = claim.x + 1; x <= claim.x + claim.w; x++) {
        for (let y = claim.y + 1; y <= claim.y + claim.h; y++) {
            fabric[getCell(x, y)] += 1;
        }
    }
});

// count the double marks
fabric.forEach(cell => {
    if (cell > 1) {
        ticker++;
    }
});

// find the claim that is perfect
claims.forEach(claim => {
    for (let x = claim.x + 1; x <= claim.x + claim.w; x++) {
        for (let y = claim.y + 1; y <= claim.y + claim.h; y++) {
            if (fabric[getCell(x, y)] !== 1) {
                return false;
            }
        }
    }
    console.log(claim.id);
});
