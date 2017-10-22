var fs = require('fs');
var filer = require("./codeBlockProcessor/fileContentReader");
var parser = require("./codeBlockProcessor/methodLevelExtractor");
var type3Tokenizer = require('./tokenProcessor/type3Tokenizer');
var detector = require("./similarityCalculator/cloneDetectoOverlapSimilarityr");

var inputDirectoryPath = 'D:\\Masters\\MastersLab\\MastersNodeJSWork\\JSCMiner\\tokenProcessor';
var outputClonePath = 'D:\\Clone-type-3.txt';

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
    //add desired token with the method;
    method.setTokenFrequencyMap(tokenFrequencyMap);
});

var globalMap=new Map();
methodList.forEach(function(method){

    var localMap=method.tokenFrequencyMap;
    localMap.forEach(function(maxTermFrequency, maxKeyTerm, thismap){

        var frequency=globalMap.get(maxKeyTerm);
        if(frequency)
        {
            maxTermFrequency+=frequency;

        }
        globalMap.set(maxKeyTerm,maxTermFrequency);

    });

});

console.log(globalMap);




var sotableMapArray=[];
globalMap.forEach(function (value, key, mapObj) {
    sotableMapArray.push([key,value]);
});
sotableMapArray.sort(function(a, b) {
    return a[1] - b[1];
});
var sortedMap=new Map();

sotableMapArray.forEach(function(element)
{
    sortedMap.set(element[0],element[1]);
});
console.log(sortedMap);