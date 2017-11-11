module.exports.createGlobalMap = createGlobalMap;
module.exports.getSortedMapByFollowingAscendingKeyOrder = getSortedMapByFollowingAscendingKeyOrder;
module.exports.sortMapByFollowingGlobalFrequencyOrder = sortMapByFollowingGlobalFrequencyOrder;
module.exports.mapToJSON=mapToJSON;



function createGlobalMap(methodList) {
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

    var sortedLocalMapWithGlobalFrequencyOrder = getSortedMapByFollowingAscendingKeyOrder(localMapWithGlobalFrequencyOrder);
    var localMapWithLocalKeyAfterSortingFollowingGlobalFrequencyOrder = new Map();

    sortedLocalMapWithGlobalFrequencyOrder.forEach(function (maxTermFrequency, maxKeyTerm, thismap) {
        var frequencyFromLocalMap = mapTobeSorted.get(maxKeyTerm);
        localMapWithLocalKeyAfterSortingFollowingGlobalFrequencyOrder.set(maxKeyTerm, frequencyFromLocalMap);
    });

    return localMapWithLocalKeyAfterSortingFollowingGlobalFrequencyOrder;
}

function mapToJSON(map) {
    "use strict";
    var object = [];
    map.forEach(function (value, key, thismap) {
        object.push([key,value]);
    });

    return object;
}