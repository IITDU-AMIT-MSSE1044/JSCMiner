var fs = require('fs');
var filer = require("./code-block-processor/file-content-reader");
var parser = require("./code-block-processor/function-level-extractor");
var type3Tokenizer = require('./token-processor/type-3-tokenizer');
var tokenizer=require('./token-processor/tokenizer');

var gtpBuilder=require('./gtp-calulator/gtp-calculator');
var inputDirectoryPath = 'D:/Masters/MastersLab/MastersNodeJSWork/JSCMiner/test-dataset/scraperjs-src';
var outputClonePath = 'D:/in.txt';
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
    var tokenFrequencyMap = type3Tokenizer.getTokenFrequencyMap(method.methodCode);
    method.setTokenFrequencyMap(tokenFrequencyMap);
});


var globalMap=gtpBuilder.createGlobalMap(methodList);
var globalSortedMap=gtpBuilder.getSortedMapByFollowingAscendingKeyOrder(globalMap);
var GTPJSON =gtpBuilder.mapToJSON(globalSortedMap);
fs.appendFileSync(outputClonePath+"gtp-calulator.json",JSON.stringify(GTPJSON));

methodList.forEach(function (method) {
    var tokenFrequencyMap = gtpBuilder.sortMapByFollowingGlobalFrequencyOrder(method.tokenFrequencyMap,globalSortedMap);
    method.setTokenFrequencyMap(tokenFrequencyMap);
    method.setTokenString(tokenizer.createTokenAsSourcererCC(tokenFrequencyMap));
});


var tokenString="";
var headerFiles="";
methodList.forEach(function (method) {
    var indexString=type3Tokenizer.getTokenIndexPortion(method.tokenFrequencyMap,0.80);
    method.setIndexString(indexString);
    tokenString+=method.methodID+","+method.methodID+"@#@"+method.tokenString+'\n';
    headerFiles+=method.methodID+","+method.filePath+','+method.startLine+","+method.endLine+'\n';
});

fs.appendFileSync(outputClonePath+"tokens.file", tokenString);
fs.appendFileSync(outputClonePath+"header.file", headerFiles);







