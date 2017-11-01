var fs = require('fs');
var filer = require("./codeBlockProcessor/fileContentReader");
var parser = require("./codeBlockProcessor/methodLevelExtractor");
var type1Tokenizer = require('./tokenProcessor/type1Tokenizer');
var type2Tokenizer = require('./tokenProcessor/type2Tokenizer');
var type3Tokenizer = require('./tokenProcessor/type3Tokenizer');

var detector = require("./similarityCalculator/cloneDetectoOverlapSimilarityr");

var inputDirectoryPath = 'D:\\My Research On Performance Testing\\MyImplementationOfAbrush';
var outputClonePath = 'D:\\AllClones.txt';

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
var threashold = 0.80;
var clonePair = new Array();

methodList.forEach(function (method) {
    methodList.forEach(function (candidate) {
        if (method.methodID < candidate.methodID) {
            if ((method != undefined) && (candidate != undefined)) {
                var isClone = detector.detectClone(method.tokenFrequencyMap, candidate.tokenFrequencyMap, threashold);
                if (isClone) {
                    var type = "Type-3";
                    if (isPerametricArraysEqual(method.tokenParametricArray, candidate.tokenParametricArray)) {
                        type = "Type-2";
                    }
                    if (method.tokenHashValue === candidate.tokenHashValue) {
                        type = "Type-1";
                    }
                    clonePair.push({'first': method, 'second': candidate, 'type': type});
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
console.log(clonePair.length);
clonePair.forEach(function (pair) {

    var clone = pair.first.methodID + '\n' + pair.second.methodID +'\n'+ pair.type+'\n' +
        pair.first.fileName + "," + pair.first.startLine + "," + pair.first.endLine + '\n' +
        pair.second.fileName + "," + pair.second.startLine + "," + pair.second.endLine + '\n' +
        pair.first.methodCode + '\n' + pair.second.methodCode
        + '\n' + "----------------------------------------------------------------------" + '\n';
    fs.appendFileSync(outputClonePath, clone);
});


var debug = 0;
