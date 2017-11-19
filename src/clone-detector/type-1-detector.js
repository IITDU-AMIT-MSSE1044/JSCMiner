module.exports.getClonePairsWithoutIndexMaking = getClonePairsWithoutIndexMaking;
module.exports.getClonePairsWithIndexMaking = getClonePairsWithIndexMaking;


var contentProvider = require('./content-provider');
var elasticlunr = require('elasticlunr');
var model = require('../model/clone-pair');

function getClonePairsWithoutIndexMaking(configuration) {
    "use strict";
    var clonePairs = new Array();
    var functionList = contentProvider.getFunctionListForTypeOneDetectorByInputDirectoryPath(configuration);
    functionList.forEach(function (method) {
        functionList.forEach(function (candidate) {
            if (method.methodID < candidate.methodID) {
                if ((method != undefined) && (candidate != undefined)) {
                    if (method.tokenHashValue === candidate.tokenHashValue) {
                        var type = "Type-1";
                        clonePairs.push(new model.ClonePair(method, candidate, type));
                    }
                }

            }
        });
    });
    return clonePairs;
}


function getClonePairsWithIndexMaking(configuration) {
    "use strict";
    var clonePairs = new Array();
    var functionList = contentProvider.getFunctionListForTypeOneDetectorByInputDirectoryPath(configuration);
    var indexer = elasticlunr(function () {
        this.setRef('id');
        this.addField('tokenHashValue');
        this.saveDocument(false);
    });
    functionList.forEach(function (method) {
        "use strict";
        var doc = {
            "id": method.methodID,
            "tokenHashValue": method.tokenHashValue
        };
        indexer.addDoc(doc);
    });
    functionList.forEach(function (method) {
        var matchedResult = indexer.search(method.tokenHashValue);
        matchedResult.forEach(function (reference) {
            var candidate = methodList[reference.ref];
            if ((method != undefined) && (candidate != undefined)) {
                if (method.tokenHashValue === candidate.tokenHashValue) {
                    var type = "Type-1";
                    clonePairs.push(new model.ClonePair(method, candidate, type));
                }
            }
        });
    });
    return clonePairs;
}









