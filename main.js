var filer = require("./codeBlockProcessor/fileContentReader");
var parser = require("./codeBlockProcessor/methodLevelExtractor");
var tokenizer = require('./tokenProcessor/type3Tokenizer');
var detector = require("./cloneDetector/cloneDetectoOverlapSimilarityr");
var fs = require('fs');

var inputDirectoryPath = 'D:\\Implementation Work\\Abrush\\Browser\\js';
var outputClonePath = 'D:\\Implementation Work\\Abrush\\Browser\\js\\Clone.json';
var list = filer.getAllJsFilesWithContent(inputDirectoryPath);

var methodList = new Array();
list.forEach(function (element) {
    var methods = parser.extractJSFile(element);
    methods.forEach(function (method) {
        methodList.push(method);
    });
});

var start = new Date();
console.log(start);
methodList.forEach(function (method) {
    var tokenFrequencyMap = tokenizer.getTokenFrequencyMap(method.methodCode);
    //add desired token with the method;
});
var end = new Date();
console.log(end);
console.log("Tokenizeing time");
console.log((end.getTime() - start.getTime()) / 1000);


var startDtecting = new Date();
var threashold = 1;
var clonePair = new Array();

methodList.forEach(function (method) {
    methodList.forEach(function (candidate) {
        if (method.methodID != candidate.methodID) {
            if ((method != undefined) && (candidate != undefined)) {
                var isClone = detector.detectClone(method.tokenFrequencyMap, candidate.tokenFrequencyMap, threashold);
                if (isClone) {
                    clonePair.push({'first': method, 'second': candidate});
                }
            }

        }
    });
});
var endDtecting = new Date();

console.log("Detection Done");
console.log((endDtecting.getTime() - startDtecting.getTime()) / 1000);

clonePair.forEach(function (pair) {

    var clone = pair.first.methodCode + '\n' + pair.second.methodCode + '\n';

    fs.appendFileSync(outputClonePath, clone);
});


var debug = 0;