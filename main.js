var fs = require('fs');
var filer = require("./code-block-processor/file-content-reader");
var parser = require("./code-block-processor/function-level-extractor");
var type1Tokenizer = require('./token-processor/type-1-tokenizer');
var type2Tokenizer = require('./token-processor/type-2-tokenizer');
var type3Tokenizer = require('./token-processor/type-3-tokenizer');

var detector = require("./similarity-calculator/overlap-similarity-calculator");

var inputDirectoryPath = 'D:/Masters/MastersLab/MastersNodeJSWork/JSCMiner/test-dataset/scraperjs-src';
var outputClonePath = 'D:/all_compare_clone.txt';

var list = filer.getAllJsFilesWithContent(inputDirectoryPath);

var methodList = new Array();
list.forEach(function (element) {
    var methods = parser.extractJSFile(element);
    methods.forEach(function (method) {
        methodList.push(method);
    });
});

methodList.forEach(function (method, index) {
    method.setMethodID(index);
});

var start = new Date();
console.log(start);
methodList.forEach(function (method) {
    var hash = type1Tokenizer.getHasHValueOfToken(method.methodCode);
    method.setTokenHashValue(hash);
    var parametricArray = type2Tokenizer.getParametricPlusIdentifiersTokenize(method.methodCode)
    method.setTokenParametricArray(parametricArray);
    var tokenFrequencyMap = type3Tokenizer.getTokenFrequencyMap(method.methodCode);
    method.setTokenFrequencyMap(tokenFrequencyMap);
});


var end = new Date();
console.log(end);
console.log("Tokenizeing time");
console.log((end.getTime() - start.getTime()) / 1000);


var startDetecting = new Date();
var threashold =0.80;
var clonePair = new Array();

methodList.forEach(function (method) {
    methodList.forEach(function (candidate) {
        if (method.methodID < candidate.methodID) {
            if ((method != undefined) && (candidate != undefined)) {
                var isClone = detector.isProbableClone(method.tokenFrequencyMap, candidate.tokenFrequencyMap, threashold);
                if (isClone) {
                   var type = "Type-3";
                    //clonePair.push({'first': method, 'second': candidate, 'type': type});
                    /*if (isPerametricArraysEqual(method.tokenParametricArray, candidate.tokenParametricArray)) {
                        var type = "Type-2";
                        clonePair.push({'first': method, 'second': candidate, 'type': type});
                    }*/
                    if (method.tokenHashValue === candidate.tokenHashValue) {
                       var type = "Type-1";
                        clonePair.push({'first': method, 'second': candidate, 'type': type});
                    }

                }
            }

        }
    });
});


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

var endDetecting = new Date();
console.log("Detection Done");
console.log((endDetecting.getTime() - startDetecting.getTime()) / 1000);
console.log("number of clone detected:--"+clonePair.length);
var clone="Detection Done in--"+((endDetecting.getTime() - startDetecting.getTime()) / 1000)+'\n'+"total number of clone="+clonePair.length+'\n';
clonePair.forEach(function (pair) {
    clone+= pair.first.methodID +","+ pair.second.methodID +'\n';/*+ pair.type+'\n' +
        pair.first.fileName + "," + pair.first.startLine + "," + pair.first.endLine + '\n' +
        pair.second.fileName + "," + pair.second.startLine + "," + pair.second.endLine + '\n' +
        pair.first.methodCode + '\n' + pair.second.methodCode
        + '\n' + "----------------------------------------------------------------------" + '\n';*/
});
fs.appendFileSync(outputClonePath, clone);

