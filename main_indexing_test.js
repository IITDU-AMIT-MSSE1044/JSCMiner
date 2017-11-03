var fs = require('fs');
var filer = require("./codeBlockProcessor/fileContentReader");
var parser = require("./codeBlockProcessor/methodLevelExtractor");
var type3Tokenizer = require('./tokenProcessor/type3Tokenizer');
var tokenizer=require('./tokenProcessor/tokenizer');

var gtpBuilder=require('./GTP/GTPComputing');
var inputDirectoryPath = 'D:\\My Research On Performance Testing\\MyImplementationOfAbrush';
var outputClonePath = 'D:\\';
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
fs.appendFileSync(outputClonePath+"GTP.json",JSON.stringify(GTPJSON));

methodList.forEach(function (method) {
    var tokenFrequencyMap = gtpBuilder.sortMapByFollowingGlobalFrequencyOrder(method.tokenFrequencyMap,globalSortedMap);
    method.setTokenFrequencyMap(tokenFrequencyMap);
    method.setTokenString(tokenizer.createToken(tokenFrequencyMap));
});


var tokenString="";
var headerFiles="";
methodList.forEach(function (method) {
    console.log(type3Tokenizer.getTokenIndexPortion(method.tokenFrequencyMap,0.80));
    tokenString+=method.methodID+"##"+method.tokenString+'\n';
    headerFiles+=method.methodID+","+method.filePath+','+method.startLine+","+method.endLine+'\n';
});

fs.appendFileSync(outputClonePath+"tokens.file", tokenString);
fs.appendFileSync(outputClonePath+"header.file", headerFiles);




var k=0;






