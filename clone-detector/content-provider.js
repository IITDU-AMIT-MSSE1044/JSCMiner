module.exports.getCompleteFunctionListByDirectoryPath = getCompleteFunctionListByDirectoryPath;
module.exports.getRawFunctionListByDirectoryPath=getRawFunctionListByDirectoryPath;
module.exports.getFunctionListForTypeOneDetectorByInputDirectoryPath=getFunctionListForTypeOneDetectorByInputDirectoryPath;
module.exports.getFunctionListForTypeTwoDetectorByInputDirectoryPath=getFunctionListForTypeTwoDetectorByInputDirectoryPath;
module.exports.getFunctionListForTypeThreeDetectorByInputDirectoryPath=getFunctionListForTypeThreeDetectorByInputDirectoryPath;



var fs = require('fs');
var fileParser = require("././file-content-reader");
var functionParser = require("././function-level-extractor");
var type1Tokenizer = require('././type-1-Tokenizer');
var type2Tokenizer = require('././type-2-Tokenizer');
var type3Tokenizer = require('././type-3-Tokenizer');




function getFunctionListForTypeOneDetectorByInputDirectoryPath(inputDirectoryPath) {
    "use strict";
    var list = fileParser.getAllJsFilesWithContent(inputDirectoryPath);

    var methodList = new Array();
    list.forEach(function (element) {
        var methods = functionParser.extractJSFile(element);
        methods.forEach(function (method) {
            methodList.push(method);
        });
    });

    methodList.forEach(function (method, index) {
        method.setMethodID(index);

        var hash = type1Tokenizer.getHasHValueOfToken(method.methodCode);
        method.setTokenHashValue(hash);
    });
    return methodList;
}
function getFunctionListForTypeTwoDetectorByInputDirectoryPath(inputDirectoryPath) {
    "use strict";
    var list = fileParser.getAllJsFilesWithContent(inputDirectoryPath);

    var methodList = new Array();
    list.forEach(function (element) {
        var methods = functionParser.extractJSFile(element);
        methods.forEach(function (method) {
            methodList.push(method);
        });
    });
    methodList.forEach(function (method, index) {
        method.setMethodID(index);
        var parametricArray = type2Tokenizer.getParametricPlusIdentifiersTokenize(method.methodCode)
        method.setTokenParametricArray(parametricArray);
        var hashValueOfParametricArry=type2Tokenizer.getHashValueOfParametricArray(method.methodCode);
        method.setTokenHashValueParametricArray(hashValueOfParametricArry);
    });
    return methodList;
}
function getFunctionListForTypeThreeDetectorByInputDirectoryPath(inputDirectoryPath) {
    "use strict";
    var list = fileParser.getAllJsFilesWithContent(inputDirectoryPath);

    var methodList = new Array();
    list.forEach(function (element) {
        var methods = functionParser.extractJSFile(element);
        methods.forEach(function (method) {
            methodList.push(method);
        });
    });
    methodList.forEach(function (method, index) {
        method.setMethodID(index);
        var parametricArray = type2Tokenizer.getParametricPlusIdentifiersTokenize(method.methodCode)
        method.setTokenParametricArray(parametricArray);
        var tokenFrequencyMap = type3Tokenizer.getTokenFrequencyMap(method.methodCode);
        method.setTokenFrequencyMap(tokenFrequencyMap);
    });
    return methodList;
}
function getCompleteFunctionListByDirectoryPath(inputDirectoryPath) {
    "use strict";
    var list = fileParser.getAllJsFilesWithContent(inputDirectoryPath);

    var methodList = new Array();
    list.forEach(function (element) {
        var methods = functionParser.extractJSFile(element);
        methods.forEach(function (method) {
            methodList.push(method);
        });
    });
    methodList.forEach(function (method, index) {
        method.setMethodID(index);
        var hash = type1Tokenizer.getHasHValueOfToken(method.methodCode);
        method.setTokenHashValue(hash);
        var parametricArray = type2Tokenizer.getParametricPlusIdentifiersTokenize(method.methodCode);
        method.setTokenParametricArray(parametricArray);
        var hashValueOfParametricArry=type2Tokenizer.getHashValueOfParametricArray(method.methodCode);
        method.setTokenHashValueParametricArray(hashValueOfParametricArry);
        var tokenFrequencyMap = type3Tokenizer.getTokenFrequencyMap(method.methodCode);
        method.setTokenFrequencyMap(tokenFrequencyMap);
    });

    methodList.forEach(function (method, index) {
        method.setMethodID(index);
    });

    return methodList;
}
function getRawFunctionListByDirectoryPath(inputDirectoryPath) {
    "use strict";
    var list = fileParser.getAllJsFilesWithContent(inputDirectoryPath);
    var methodList = new Array();
    list.forEach(function (element) {
        var methods = functionParser.extractJSFile(element);
        methods.forEach(function (method) {
            methodList.push(method);
        });
    });
    methodList.forEach(function (method, index) {
        method.setMethodID(index);
    });
    return methodList;
}

