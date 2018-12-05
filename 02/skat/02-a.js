console.clear();
const idList = require('./input.js');
// const inputs = ['bababc'];
let doubles = 0;
let triples = 0;

idList.forEach((id, index) => {
    const sortedID = id.split('').sort();
    let tripleFlag = false;
    let doubleFlag = false;
    for (let i = 0; i < sortedID.length; i++) {
        const z = sortedID[i - 1];
        const a = sortedID[i];
        const b = sortedID[i + 1];

        // if both flags are tripped, the work is done
        if (doubleFlag && tripleFlag) {
            continue;
        }

        // only check pairs on the first character
        if (a === b && a !== z) {
            // if a === b, introduce c and d
            const c = sortedID[i + 2];
            const d = sortedID[i + 3];
            // find triples
            if (a === b && a === c && a !== d && !tripleFlag) {
                console.log(z, a, b, c, d, 'TRIPLE');
                triples += 1;
                tripleFlag = true;
            }
            // find doubles
            else if (a === b && a !== c && !doubleFlag) {
                console.log(z, a, b, c, 'DOUBLE');
                doubles += 1;
                doubleFlag = true;
            }
        }
    }
    // loop complete, reset the flags
    tripleFlag = false;
    doubleFlag = false;
});

console.log(doubles * triples);
