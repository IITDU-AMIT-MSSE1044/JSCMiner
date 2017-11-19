module.exports.getCompleteFunctionListByDirectoryPath = getCompleteFunctionListByDirectoryPath;
module.exports.getRawFunctionListByDirectoryPath = getRawFunctionListByDirectoryPath;
module.exports.getFunctionListForTypeOneDetectorByInputDirectoryPath = getFunctionListForTypeOneDetectorByInputDirectoryPath;
module.exports.getFunctionListForTypeTwoDetectorByInputDirectoryPath = getFunctionListForTypeTwoDetectorByInputDirectoryPath;
module.exports.getFunctionListForTypeThreeDetectorByInputDirectoryPath = getFunctionListForTypeThreeDetectorByInputDirectoryPath;


var fs = require('fs');
var fileParser = require("../code-block-processor/file-content-reader");
var functionParser = require("../code-block-processor/function-level-extractor");
var type1Tokenizer = require('../token-processor/type-1-tokenizer');
var type2Tokenizer = require('../token-processor/type-2-Tokenizer');
var type3Tokenizer = require('../token-processor/type-3-Tokenizer');
var chalk = require('chalk');

function getFunctionListForTypeOneDetectorByInputDirectoryPath(configuration) {
    "use strict";
    var list = fileParser.getAllJsFilesWithContent(configuration.basePath);
    console.log(chalk.red.bold(list.length)+(chalk.green.bold(" Sources Files are collected")));
    var methodList = new Array();
    list.forEach(function (element) {
        var methods = functionParser.extractJSFile(element);
        methods.forEach(function (method) {
            methodList.push(method);
        });
    });
    console.log(chalk.red.bold(methodList.length)+(chalk.green.bold(" Methods are parsed")));

    var updatedMethodList = getUpDatedMethodListByConfiguration(methodList, configuration);
    console.log(chalk.red.bold(updatedMethodList.length)+ (chalk.green.bold(" Methods are configured")));

    updatedMethodList.forEach(function (method, index) {
        method.setMethodID(index);

        var hash = type1Tokenizer.getHasHValueOfToken(method.methodCode);
        method.setTokenHashValue(hash);
    });
    return updatedMethodList;
}

function getFunctionListForTypeTwoDetectorByInputDirectoryPath(configuration) {
    "use strict";
    var list = fileParser.getAllJsFilesWithContent(configuration.basePath);
    console.log(chalk.red.bold(list.length)+(chalk.green.bold(" Sources Files are collected")));
    var methodList = new Array();
    list.forEach(function (element) {
        var methods = functionParser.extractJSFile(element);
        methods.forEach(function (method) {
            methodList.push(method);
        });
    });
    console.log(chalk.red.bold(methodList.length)+(chalk.green.bold(" Methods are parsed")));
    var updatedMethodList = getUpDatedMethodListByConfiguration(methodList, configuration);
    console.log(chalk.red.bold(updatedMethodList.length)+ (chalk.green.bold(" Methods are configured")));
    updatedMethodList.forEach(function (method, index) {
        method.setMethodID(index);
        var parametricArray = type2Tokenizer.getParametricPlusIdentifiersTokenize(method.methodCode)
        method.setTokenParametricArray(parametricArray);
        var hashValueOfParametricArry = type2Tokenizer.getHashValueOfParametricArray(method.methodCode);
        method.setTokenHashValueParametricArray(hashValueOfParametricArry);
    });
    return updatedMethodList;
}

function getFunctionListForTypeThreeDetectorByInputDirectoryPath(configuration) {
    "use strict";
    var list = fileParser.getAllJsFilesWithContent(configuration.basePath);
    console.log(chalk.red.bold(list.length)+(chalk.green.bold(" Sources Files are collected")));
    var methodList = new Array();
    list.forEach(function (element) {
        var methods = functionParser.extractJSFile(element);
        methods.forEach(function (method) {
            methodList.push(method);
        });
    });
    console.log(chalk.red.bold(methodList.length)+(chalk.green.bold(" Methods are parsed")));
    var updatedMethodList = getUpDatedMethodListByConfiguration(methodList, configuration);
    console.log(chalk.red.bold(updatedMethodList.length)+ (chalk.green.bold(" Methods are configured")));
    updatedMethodList.forEach(function (method, index) {
        method.setMethodID(index);
        var parametricArray = type2Tokenizer.getParametricPlusIdentifiersTokenize(method.methodCode)
        method.setTokenParametricArray(parametricArray);
        var tokenFrequencyMap = type3Tokenizer.getTokenFrequencyMap(method.methodCode);
        method.setTokenFrequencyMap(tokenFrequencyMap);
    });
    return updatedMethodList;
}

function getCompleteFunctionListByDirectoryPath(inputDirectoryPath) {
    "use strict";
    var list = fileParser.getAllJsFilesWithContent(inputDirectoryPath);
    console.log(chalk.red.bold(list.length)+(chalk.green.bold(" Sources Files are collected")));
    var methodList = new Array();
    list.forEach(function (element) {
        var methods = functionParser.extractJSFile(element);
        methods.forEach(function (method) {
            methodList.push(method);
        });
    });
    console.log(chalk.red.bold(methodList.length)+(chalk.green.bold(" Methods are parsed")));
    var updatedMethodList = getUpDatedMethodListByConfiguration(methodList, configuration);
    console.log(chalk.red.bold(updatedMethodList.length)+ (chalk.green.bold(" Methods are configured")));
    updatedMethodList.forEach(function (method, index) {
        method.setMethodID(index);
        var hash = type1Tokenizer.getHasHValueOfToken(method.methodCode);
        method.setTokenHashValue(hash);
        var parametricArray = type2Tokenizer.getParametricPlusIdentifiersTokenize(method.methodCode);
        method.setTokenParametricArray(parametricArray);
        var hashValueOfParametricArry = type2Tokenizer.getHashValueOfParametricArray(method.methodCode);
        method.setTokenHashValueParametricArray(hashValueOfParametricArry);
        var tokenFrequencyMap = type3Tokenizer.getTokenFrequencyMap(method.methodCode);
        method.setTokenFrequencyMap(tokenFrequencyMap);
    });

    updatedMethodList.forEach(function (method, index) {
        method.setMethodID(index);
    });

    return updatedMethodList;
}

function getRawFunctionListByDirectoryPath(inputDirectoryPath) {
    "use strict";
    var list = fileParser.getAllJsFilesWithContent(inputDirectoryPath);
    console.log(chalk.red.bold(list.length)+(chalk.green.bold(" Sources Files are collected")));
    var methodList = new Array();
    list.forEach(function (element) {
        var methods = functionParser.extractJSFile(element);
        methods.forEach(function (method) {
            methodList.push(method);
        });
    });
    console.log(chalk.red.bold(methodList.length)+(chalk.green.bold(" Methods are parsed")));
    var updatedMethodList = getUpDatedMethodListByConfiguration(methodList, configuration);
    console.log(chalk.red.bold(updatedMethodList.length)+ (chalk.green.bold(" Methods are configured")));
    updatedMethodList.forEach(function (method, index) {
        method.setMethodID(index);
    });
    return updatedMethodList;
}

function getUpDatedMethodListByConfiguration(methodList, configuration) {
    "use strict";
    var updatedMethodList = new Array();
    methodList.forEach(function (method) {
        if ((configuration.minimumLines != 0 && configuration.maximumLines != 0) && (configuration.minimumLines < configuration.maximumLines)) {
            if (method.methodLength >= configuration.minimumLines && method.methodLength <= configuration.maximumLines) {
                updatedMethodList.push(method);
            }
        }
    });

    return updatedMethodList;

}