module.exports.detectClones = detectClones;

var fs = require('fs');
var type1Detector = require('./type-1-detector');
var type2Detector = require('./type-2-detector');
var type3Detector = require('./type-3-detector');

function detectClones(configuration) {
    "use strict";
    if (configuration.cloneType.toString().match("Type-1")) {
        console.log("Detecting Type-1");
        var clonePair = type1Detector.getClonePairsWithoutIndexMaking(configuration);
        console.log(clonePair.length +"  clones are  detected");
        var clones = new Array();
        clonePair.forEach(function (pair) {
            clones.push(pair.getJOSNCloneObject());
        });

        fs.writeFileSync(configuration.basePath + "//" + "clones.json", JSON.stringify(clones, null, 4));
    }
    if (configuration.cloneType.toString().match("Type-2")) {
        console.log("Detecting Type-2");
        var clonePair = type2Detector.getClonePairsWithoutIndexMaking(configuration);
        writeClone(configuration,clonePair);
    }
    if (configuration.cloneType.toString().match("Type-3")) {
        console.log("Detecting Type-3");
        var clonePair = type3Detector.getClonePairsWithoutIndexMaking(configuration);
        writeClone(configuration,clonePair);
    }
}

function writeClone(configuration,clonePair) {
    "use strict";
    var clones = new Array();

    clonePair.forEach(function (pair) {
        clones.push(pair.getJOSNCloneObject());
    });

    fs.writeFileSync(configuration.basePath + "//" + "clones.json", JSON.stringify(clones, null, 4));
}