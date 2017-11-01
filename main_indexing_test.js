var fs = require('fs');
var filer = require("./codeBlockProcessor/fileContentReader");
var parser = require("./codeBlockProcessor/methodLevelExtractor");
var type3Tokenizer = require('./tokenProcessor/type3Tokenizer');

var gtpBuilder=require('./GTP/GTPComputing');

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
    var tokenFrequencyMap = type3Tokenizer.getTokenFrequencyMap(method.methodCode);
    method.setTokenFrequencyMap(tokenFrequencyMap);
});


var globalMap=gtpBuilder.createGlobalMap(methodList);
var globalSortedMap=gtpBuilder.getSortedMapByFollowingAscendingKeyOrder(globalMap);

methodList.forEach(function (method) {
    var tokenFrequencyMap = gtpBuilder.sortMapByFollowingGlobalFrequencyOrder(method.tokenFrequencyMap,globalSortedMap);
    method.setTokenFrequencyMap(tokenFrequencyMap);
});

var k=0;






