console.clear();
const idList = require('./input.js');

// Check Each ID
for (let i = 0; i < idList.length; i++) {
    // Check Each ID against Each Ahead of it
    for (let j = i + 1; j < idList.length; j++) {
        // break the ids in arrays
        let a = idList[i].split('');
        let b = idList[j].split('');

        for (let k = 0; k < a.length - 1; k++) {
            // copy a & b
            let aa = a.slice(0);
            let bb = b.slice(0);

            // remove k from a and b
            aa.splice(k, 1);
            bb.splice(k, 1);

            // assume they match until dissproven
            let matchFlag = true;

            // check if a & b match without k
            for (let l = 0; l < aa.length; l++) {
                if (matchFlag === true) {
                    if (aa[l] !== bb[l]) {
                        matchFlag = false;
                    }
                } else {
                    break;
                }
            }
            if (matchFlag) {
                console.log(i, j, k);
                console.log(aa.join(''));
            }
        }
    }
}
