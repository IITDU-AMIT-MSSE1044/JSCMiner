module.exports.getMethodListByDirectoryPath = getMethodListByDirectoryPath;
module.exports.getRawMethodListByDirectoryPath=getRawMethodListByDirectoryPath;

var fs = require('fs');
var fileParser = require("./../codeBlockProcessor/fileContentReader");
var parser = require("./../codeBlockProcessor/methodLevelExtractor");

var type1Tokenizer = require('./../tokenProcessor/type-1-Tokenizer');
var type2Tokenizer = require('./../tokenProcessor/type-2-Tokenizer');
var type3Tokenizer = require('./../tokenProcessor/type-3-Tokenizer');

function getMethodListByDirectoryPath(inputDirectoryPath) {
    "use strict";
    var list = fileParser.getAllJsFilesWithContent(inputDirectoryPath);

    var methodList = new Array();
    list.forEach(function (element) {
        var methods = parser.extractJSFile(element);
        methods.forEach(function (method) {
            methodList.push(method);
        });
    });
    methodList.forEach(function (method, index) {
        method.setMethodID(index);
        var hash = type1Tokenizer.getHasHValueOfToken(method.methodCode);
        method.setTokenHashValue(hash);
        var parametricArray = type2Tokenizer.getParametricPlusIdentifiersTokenize(method.methodCode)
        method.setTokenParametricArray(parametricArray);
        var tokenFrequencyMap = type3Tokenizer.getTokenFrequencyMap(method.methodCode);
        method.setTokenFrequencyMap(tokenFrequencyMap);
    });
    return methodList;
}

function getRawMethodListByDirectoryPath() {
    "use strict";
    "use strict";
    var list = fileParser.getAllJsFilesWithContent(inputDirectoryPath);

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
    return methodList;
}

