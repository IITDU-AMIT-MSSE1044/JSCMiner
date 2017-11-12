const contentProvider=require('./content-provider');
function getClonePairsWithoutIndexMaking(inputDirectoryPath)
{
    "use strict";
    var clonePair = new Array();
    var functionList=contentProvider.getFunctionListForTypeTwoDetectorByInputDirectoryPath(inputDirectoryPath);
    functionList.forEach(function (method) {
        functionList.forEach(function (candidate) {
            if (method.methodID < candidate.methodID) {
                if ((method != undefined) && (candidate != undefined)) {
                    if (isPerametricArraysEqual(method.tokenParametricArray, candidate.tokenParametricArray)) {
                        var type = "Type-2";
                        clonePair.push({'first': method, 'second': candidate, 'type': type});
                    }
                }

            }
        });
    });
    return clonePair;
}


function getClonePairsWithIndexMaking(inputDirectoryPath)
{
    "use strict";
    var clonePair = new Array();
    var functionList = contentProvider.getFunctionListForTypeTwoDetectorByInputDirectoryPath(inputDirectoryPath);
    var indexer = elasticlunr(function () {
        this.setRef('id');
        this.addField('tokenHashValueParametricArray');
        this.saveDocument(false);
    });
    functionList.forEach(function (method) {
        "use strict";
        var doc = {
            "id": method.methodID,
            "tokenHashValueParametricArray": method.tokenHashValueParametricArray
        };
        indexer.addDoc(doc);
    });
    functionList.forEach(function (method) {
        var matchedResult = indexer.search(method.tokenHashValueParametricArray);
        matchedResult.forEach(function (reference) {
            var candidate = methodList[reference.ref];
            if ((method != undefined) && (candidate != undefined)) {
                if (method.tokenHashValueParametricArray === candidate.tokenHashValueParametricArray) {
                    var type = "Type-2";
                    clonePair.push({'first': method, 'second': candidate, 'type': type});
                }
            }
        });
    });
    return clonePair;
}






function isPerametricArraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length != b.length) return false;
    for (var i = 0; i < a.length; ++i) {
        if ((a[i].type !== b[i].type)||(a[i].value !== b[i].value)) return false;
    }
    return true;
}


