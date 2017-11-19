module.exports.getClonePairsWithoutIndexMaking=getClonePairsWithoutIndexMaking;
module.exports.getClonePairsWithIndexMaking=getClonePairsWithIndexMaking;





var contentProvider = require('./content-provider');
var similarityCalculator = require("../similarity-calculator/overlap-similarity-calculator");
var gtpBuilder = require('../gtp-calulator/gtp-calculator');
var tokenizer = require('../token-processor/tokenizer');
var type3Tokenizer = require('../token-processor/type-3-tokenizer');
var elasticlunr = require('elasticlunr');
var model = require('../model/clone-pair');

function getClonePairsWithoutIndexMaking(configuration) {
    "use strict";
    var clonePairs = new Array();
    var functionList = contentProvider.getFunctionListForTypeThreeDetectorByInputDirectoryPath(configuration);
    functionList.forEach(function (method) {
        functionList.forEach(function (candidate) {
            if (method.methodID < candidate.methodID) {
                if ((method != undefined) && (candidate != undefined)) {
                    var isClone = similarityCalculator.isProbableClone(method.tokenFrequencyMap, candidate.tokenFrequencyMap, configuration.threshold);
                    if (isClone) {
                        var type = "Type-3";
                        clonePairs.push(new model.ClonePair(method,candidate,type));
                    }
                }

            }
        });
    });
    return clonePairs;
}


function getClonePairsWithIndexMaking(configuration)
{

    "use strict";
    var clonePairs = new Array();
    var functionList = contentProvider.getFunctionListForTypeThreeDetectorByInputDirectoryPath(configuration);
    var globalMap = gtpBuilder.createGlobalMap(functionList);
    var globalSortedMap = gtpBuilder.getSortedMapByFollowingAscendingKeyOrder(globalMap);

       functionList.forEach(function (method) {
        var tokenFrequencyMap = gtpBuilder.sortMapByFollowingGlobalFrequencyOrder(method.tokenFrequencyMap, globalSortedMap);
        method.setTokenFrequencyMap(tokenFrequencyMap);
        method.setTokenString(tokenizer.createToken(tokenFrequencyMap));
    });

    functionList.forEach(function (method) {
        var indexString = type3Tokenizer.getTokenIndexPortion(method.tokenFrequencyMap, configuration.threshold);
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
                    clonePairs.push(new model.ClonePair(method,candidate,type));
                }
            }
        });
    });

    return clonePairs;
}







