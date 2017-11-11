var fs = require('fs');
var filer = require("./../codeBlockProcessor/fileContentReader");
var parser = require("./../codeBlockProcessor/methodLevelExtractor");
var type3Tokenizer = require('./../tokenProcessor/type-3-Tokenizer');
var detector = require("./../similarityCalculator/cloneDetectoOverlapSimilarityr");

var inputDirectoryPath = 'D:\\My Research On Performance Testing\\MyImplementationOfAbrush';
var outputClonePath = 'D:\\GTP.txt';

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



var globalMap=createGlobalMap(methodList);
var globalSortedMap = getSortedMapByFollowingAscendingKeyOrder(globalMap);
//var GTPJSON =mapToJSON(globalSortedMap);
console.log(globalSortedMap);
//fs.appendFileSync(outputClonePath,JSON.stringify(GTPJSON));

function mapToJSON(map) {
    "use strict";
    var object = [];
    map.forEach(function (value, key, thismap) {
        object.push([key,value]);
    });

    return object;
}





/*
 methodList.forEach(function (method, index) {
 var tokenMap=method.tokenFrequencyMap;
 var sotedMapAccordingtoGlobal=sortMapByFollowingGlobalFrequencyOrder(tokenMap,globalSortedMap);
 console.log("-------------------------------")
 console.log(sotedMapAccordingtoGlobal);

 });
 */


function createGlobalMap(methodList)
{
    "use strict";
    var globalMap = new Map();
    methodList.forEach(function (method) {

        var localMap = method.tokenFrequencyMap;
        localMap.forEach(function (maxTermFrequency, maxKeyTerm, thismap) {

            var frequency = globalMap.get(maxKeyTerm);
            if (frequency) {
                maxTermFrequency += frequency;

            }
            globalMap.set(maxKeyTerm, maxTermFrequency);

        });

    });
    return globalMap;
}


function getSortedMapByFollowingAscendingKeyOrder(mapToBeSorted) {
    "use strict";
    var sortableMapArray = [];
    mapToBeSorted.forEach(function (value, key, mapObj) {
        sortableMapArray.push([key, value]);
    });
    sortableMapArray.sort(function (a, b) {
        return a[1] - b[1];
    });
    var sortedMap = new Map();

    sortableMapArray.forEach(function (element) {
        sortedMap.set(element[0], element[1]);
    });
    return sortedMap;
}


function sortMapByFollowingGlobalFrequencyOrder(mapTobeSorted, globalMap) {
    "use strict";
    var localMapWithGlobalFrequencyOrder = new Map();
    mapTobeSorted.forEach(function (maxTermFrequency, maxKeyTerm, thismap) {
        var frequencyFromGlobalMap = globalMap.get(maxKeyTerm);
        localMapWithGlobalFrequencyOrder.set(maxKeyTerm, frequencyFromGlobalMap);
    });

    var sortedLocalMapWithGlobalFrequencyOrder = getSortedMapByFollowingAssendingKeyOrder(localMapWithGlobalFrequencyOrder);
    var localMapWithLocalKeyAfterSortingFollowingGlobalFrequencyOrder = new Map();

    sortedLocalMapWithGlobalFrequencyOrder.forEach(function (maxTermFrequency, maxKeyTerm, thismap) {
        var frequencyFromLocalMap = mapTobeSorted.get(maxKeyTerm);
        localMapWithLocalKeyAfterSortingFollowingGlobalFrequencyOrder.set(maxKeyTerm, frequencyFromLocalMap);
    });

    return localMapWithLocalKeyAfterSortingFollowingGlobalFrequencyOrder;
}


