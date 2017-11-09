var fs = require('fs');
var filer = require("./codeBlockProcessor/fileContentReader");
var parser = require("./codeBlockProcessor/methodLevelExtractor");
var type3Tokenizer = require('./tokenProcessor/type3Tokenizer');
var tokenizer=require('./tokenProcessor/tokenizer');
var detector = require("./similarityCalculator/cloneDetectoOverlapSimilarityr");


var gtpBuilder=require('./GTP/GTPComputing');
var inputDirectoryPath = 'E:\\All Store\\js_dataset\\1.5K';
var outputClonePath = 'D:\\';

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
    var indexString=type3Tokenizer.getTokenIndexPortion(method.tokenFrequencyMap,threashold);
    method.setIndexString(indexString);
    tokenString+=method.methodID+"##"+method.tokenString+'\n';
    headerFiles+=method.methodID+","+method.filePath+','+method.startLine+","+method.endLine+'\n';
});

fs.appendFileSync(outputClonePath+"tokens.file", tokenString);
fs.appendFileSync(outputClonePath+"header.file", headerFiles);


var elasticlunr = require('elasticlunr');
var indexer = elasticlunr(function () {
    this.setRef('id');
    this.addField('indexString');
    this.saveDocument(false);
});


methodList.forEach(function (method) {
    "use strict";
    var doc={
        "id":method.methodID,
        "indexString":method.indexString
    };
    indexer.addDoc(doc);
});




methodList.forEach(function (method) {
    "use strict";
    console.log("search for--"+ method.methodID);
    console.log("search for--"+ method.indexString);
    var matchResult= indexer.search(method.indexString);
   // console.log(matchResult);
   matchResult.forEach(function(reference)
    {
        var reference_method= methodList[reference.ref];

        if(method.methodID!=reference_method.methodID)
        {
            var isClone = detector.detectClone(method.tokenFrequencyMap, candidate.tokenFrequencyMap, threashold);
            if (isClone) {
                var type = "Type-3";
                clonePair.push({'first': method, 'second': candidate, 'type': type});
            }
        }


    });
    console.log("match reselt end for "+method.methodID);
});


