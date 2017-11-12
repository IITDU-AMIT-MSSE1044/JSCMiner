var fs = require('fs');
var filer = require("./code-block-processor/file-content-reader");
var parser = require("./code-block-processor/function-level-extractor");
var type1Tokenizer = require('./token-processor/type-1-tokenizer');
var type2Tokenizer = require('./token-processor/type-2-tokenizer');
var type3Tokenizer = require('./token-processor/type-3-tokenizer');
var tokenizer = require('./token-processor/tokenizer');
var detector = require("./similarity-calculator/overlap-similarity-calculator");


var gtpBuilder = require('./gtp-calulator/gtp-calculator');
var inputDirectoryPath = '/media/misu/MS/Masters/MastersLab/MastersNodeJSWork/JSCMiner/test-dataset/scraperjs-src';
var outputClonePath = '/home/misu/Desktop/index_compare_clone.txt';

var threashold = 0.80;
var clonePair = new Array();

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


var globalMap = gtpBuilder.createGlobalMap(methodList);
var globalSortedMap = gtpBuilder.getSortedMapByFollowingAscendingKeyOrder(globalMap);
//var GTPJSON = gtpBuilder.mapToJSON(globalSortedMap);
//fs.appendFileSync(outputClonePath + "gtp-calulator.json", JSON.stringify(GTPJSON));

methodList.forEach(function (method) {
    var tokenFrequencyMap = gtpBuilder.sortMapByFollowingGlobalFrequencyOrder(method.tokenFrequencyMap, globalSortedMap);
    method.setTokenFrequencyMap(tokenFrequencyMap);
    method.setTokenString(tokenizer.createToken(tokenFrequencyMap));
});



//var tokenString = "";
//var headerFiles = "";
methodList.forEach(function (method) {
    var indexString = type3Tokenizer.getTokenIndexPortion(method.tokenFrequencyMap, threashold);
    method.setIndexString(indexString);
    //tokenString += method.methodID + "##" + method.tokenString + '\n';
    //headerFiles += method.methodID + "," + method.filePath + ',' + method.startLine + "," + method.endLine + '\n';
});

//fs.appendFileSync(outputClonePath + "tokens.txt", tokenString);
//fs.appendFileSync(outputClonePath + "header.txt", headerFiles);




var startDetecting = new Date();

var elasticlunr = require('elasticlunr');
var indexer = elasticlunr(function () {
    this.setRef('id');
    this.addField('indexString');
    this.saveDocument(false);
});


methodList.forEach(function (method) {
    "use strict";
    var doc = {
        "id": method.methodID,
        "indexString": method.indexString
    };
    indexer.addDoc(doc);
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


methodList.forEach(function (method) {
    "use strict";
   // console.log("search for--" + method.methodID);
    //console.log("search for--"+ method.indexString);
    var matchResult = indexer.search(method.indexString);
    // console.log(matchResult);
    matchResult.forEach(function (reference) {
        var candidate = methodList[reference.ref];
        if (method.methodID < candidate.methodID) {
            var isClone = detector.isProbableClone(method.tokenFrequencyMap, candidate.tokenFrequencyMap, threashold);
            if (isClone) {
                var type = "Type-3";
                clonePair.push({'first': method, 'second': candidate, 'type': type});
                /*if (method.tokenHashValue === candidate.tokenHashValue) {
                    var type = "Type-1";
                    clonePair.push({'first': method, 'second': candidate, 'type': type});
                }
                if (isPerametricArraysEqual(method.tokenParametricArray, candidate.tokenParametricArray)) {
                    var type = "Type-2";
                    clonePair.push({'first': method, 'second': candidate, 'type': type});
                }*/
            }
        }
    });
    //console.log("match result end for " + method.methodID);
});
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


