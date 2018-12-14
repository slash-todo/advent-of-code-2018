console.clear();
const toHexavigesimal = require('./hexavigesimal.js');
// const data = require('./input.js');
const data = [2, 3, 0, 3, 10, 11, 12, 1, 1, 0, 1, 99, 2, 1, 1, 2];

function buildNodes(data) {
    let ticker = 0;
    const depth = 0;
    const array = data.slice();
    const nodes = new Map();
    const _getMetaEntries = arr => {
        let nodesLeft = arr[0];
        let children = arr[0];
        let metaEntryCount = arr[1];
        let nextIndex = 0;
        let whenZeroOffset = [];
        while (nodesLeft > 0) {
            nodesLeft--;
            let seekOffset = 2;
            const childCount = arr[nextIndex];
            const metaCount = arr[nextIndex + 1];
            // debugger;
            if (childCount === 0) {
                // if no children, increase
                // the skip ahead by the metaCount
                seekOffset += metaCount;
            } else if (childCount > 0) {
                nodesLeft++;
                whenZeroOffset.push(metaCount);
            }
            nextIndex += seekOffset;
        }
        const finalOffset =
            whenZeroOffset.length === 0
                ? 1
                : whenZeroOffset.length === 1
                ? whenZeroOffset[0]
                : whenZeroOffset.reduce((a, b) => a + b);
        const targetIndex = nextIndex + finalOffset - metaEntryCount;
        const metaEntries = arr.splice(targetIndex, metaEntryCount);
        arr.splice(0, 2);
    };
    while (array.length > 0 && ticker < 100) {
        // debugger;
        const id = toHexavigesimal(++ticker);
        const body = {
            id: id,
            depth: depth,
            metaEntries: _getMetaEntries(array)
        };
        nodes.set(id, body);
    }
    return nodes;
}

const sumNodes = nodes => {
    let entries = [];
    nodes.forEach(node => {
        node.metaEntries.forEach(el => {
            entries.push(el);
        });
    });
    return entries.reduce((a, b) => a + b);
};

console.log(sumNodes(buildNodes(data)));
