var contentProvider = require('./content-provider');
var elasticlunr = require('elasticlunr');

function getClonePairsWithoutIndexMaking(inputDirectoryPath) {
    "use strict";
    var clonePair = new Array();
    var functionList = contentProvider.getFunctionListForTypeOneDetectorByInputDirectoryPath(inputDirectoryPath);
    functionList.forEach(function (method) {
        functionList.forEach(function (candidate) {
            if (method.methodID < candidate.methodID) {
                if ((method != undefined) && (candidate != undefined)) {
                    if (method.tokenHashValue === candidate.tokenHashValue) {
                        var type = "Type-1";
                        clonePair.push({'first': method, 'second': candidate, 'type': type});
                    }
                }

            }
        });
    });
    return clonePair;
}


function getClonePairsWithIndexMaking(inputDirectoryPath) {
    "use strict";
    var clonePair = new Array();
    var functionList = contentProvider.getFunctionListForTypeOneDetectorByInputDirectoryPath(inputDirectoryPath);
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
                    clonePair.push({'first': method, 'second': candidate, 'type': type});
                }
            }
        });
    });
    return clonePair;
}









