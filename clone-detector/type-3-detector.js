var contentProvider = require('./content-provider');
var similarityCalculator = require("./similarity-calculator/overlapSimilarity");
var gtpBuilder = require('./gtp-calulator/GTPComputing');
var tokenizer = require('./token-processor/tokenizer');
var type3Tokenizer = require('./token-processor/type-3-tokenizer');
var elasticlunr = require('elasticlunr');


function getClonePairsWithoutIndexMaking(inputDirectoryPath,threshold) {
    "use strict";
    var clonePair = new Array();
    var functionList = contentProvider.getFunctionListForTypeThreeDetectorByInputDirectoryPath(inputDirectoryPath);
    functionList.forEach(function (method) {
        functionList.forEach(function (candidate) {
            if (method.methodID < candidate.methodID) {
                if ((method != undefined) && (candidate != undefined)) {
                    var isClone = similarityCalculator.isProbableClone(method.tokenFrequencyMap, candidate.tokenFrequencyMap, threshold);
                    if (isClone) {
                        var type = "Type-3";
                        clonePair.push({'first': method, 'second': candidate, 'type': type});
                    }
                }

            }
        });
    });
    return clonePair;
}


function getClonePairsWithIndexMaking(inputDirectoryPath,threshold)
{

    "use strict";
    var clonePair = new Array();
    var functionList = contentProvider.getFunctionListForTypeThreeDetectorByInputDirectoryPath(inputDirectoryPath);
    var globalMap = gtpBuilder.createGlobalMap(functionList);
    var globalSortedMap = gtpBuilder.getSortedMapByFollowingAscendingKeyOrder(globalMap);

       functionList.forEach(function (method) {
        var tokenFrequencyMap = gtpBuilder.sortMapByFollowingGlobalFrequencyOrder(method.tokenFrequencyMap, globalSortedMap);
        method.setTokenFrequencyMap(tokenFrequencyMap);
        method.setTokenString(tokenizer.createToken(tokenFrequencyMap));
    });

    functionList.forEach(function (method) {
        var indexString = type3Tokenizer.getTokenIndexPortion(method.tokenFrequencyMap, threshold);
        method.setIndexString(indexString);
    });

    var indexer = elasticlunr(function () {
        this.setRef('id');
        this.addField('indexString');
        this.saveDocument(false);
    });
    functionList.forEach(function (method) {
        "use strict";
        var doc = {
            "id": method.methodID,
            "indexString": method.indexString
        };
        indexer.addDoc(doc);
    });

    functionList.forEach(function (method) {
        "use strict";
        var matchResult = indexer.search(method.indexString);
        matchResult.forEach(function (reference) {
            var candidate = methodList[reference.ref];
            if (method.methodID < candidate.methodID) {
                var isClone = detector.isProbableClone(method.tokenFrequencyMap, candidate.tokenFrequencyMap, threshold);
                if (isClone) {
                    var type = "Type-3";
                    clonePair.push({'first': method, 'second': candidate, 'type': type});
                }
            }
        });
    });

    return clonePair;
}







