module.exports.getParametricTokenize=getParametricTokenize;
module.exports.getParametricPlusIdentifiersTokenize=getParametricPlusIdentifiersTokenize;
module.exports.getFullTypeTwoTokenizer=getFullTypeTwoTokenizer;
module.exports.isPerametricArraysEqual=isPerametricArraysEqual;


var esprima = require('esprima');

function getParametricTokenize(code) {
    var tokenObjectArray = getNormalToken(code);
    var tokenCopied = getCopiedToken(tokenObjectArray);
    var setArray = getUniqueIdentifiersFromTokenObjectArray(tokenObjectArray);
    setArray.forEach(function (setElement, setIndex, set) {
        tokenObjectArray.forEach(function (element, index, array) {
            if (element.type === 'Identifier' && element.value === setElement) {
                tokenCopied[index].value = "X" + setIndex;
            }

        });
    });
    return tokenCopied;
}
function getParametricPlusIdentifiersTokenize(code) {
    var tokenObjectArray = getNormalToken(code);
    var tokenCopied = getCopiedToken(tokenObjectArray);
    var setArray = getUniqueIdentifiersFromTokenObjectArray(tokenObjectArray);
    setArray.forEach(function (setElement, setIndex, set) {
        tokenObjectArray.forEach(function (element, index, array) {
            if (element.type === 'Identifier' && element.value === setElement) {
                tokenCopied[index].value = "X" + setIndex;
            }
            if (element.type === 'Numeric' || element.type === 'Boolean' || element.type === 'String') {
                tokenCopied[index].value = "literal";
            }

        });
    });
    return tokenCopied;

}
function getFullTypeTwoTokenizer(code) {
    var tokenObjectArray = getNormalToken(code);
    var tokenCopied = getCopiedToken(tokenObjectArray);
    var setArray = getUniqueIdentifiersFromTokenObjectArray(tokenObjectArray);
    setArray.forEach(function (setElement, setIndex, set) {
        tokenObjectArray.forEach(function (element, index, array) {
            if (element.type === 'Identifier' && element.value === setElement) {
                tokenCopied[index].value = "X";
            }
            if (element.type === 'Numeric' || element.type === 'Boolean' || element.type === 'String') {
                tokenCopied[index].value = "literal";
            }

        });
    });
    return tokenCopied;

}
function getNormalToken(code) {
    var token = esprima.tokenize(code);
    return token;
}
function getCopiedToken(tokenArray) {
    var tokenCopied = new Array();
    tokenArray.forEach(function (element) {
        tokenCopied.push(element);
    });
    return tokenCopied;

}
function getUniqueIdentifiersFromTokenObjectArray(tokenObjectArray) {
    var uniqueIdentifiersValues = new Set();
    tokenObjectArray.forEach(function (element) {
        if (element.type === 'Identifier') {
            uniqueIdentifiersValues.add(element.value);
        }
    });
    var setArray = new Array();
    uniqueIdentifiersValues.forEach(function (element) {
        setArray.push(element);
    });
    return setArray;
}

function isPerametricArraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length != b.length) return false;

    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.

    for (var i = 0; i < a.length; ++i) {
        if ((a[i].type !== b[i].type) || (a[i].value !== b[i].value)) return false;
    }
    return true;
}

