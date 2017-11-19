module.exports.getAllJsFilesWithContent = getAllJsFilesWithContent;
module.exports.walk = findJSFiles;

var filesystem = require('fs');
var path = require('path');
var model = require('../model/source-file');

function getAllJsFilesWithContent(basePathOfTheApplication) {
    var jsFileList = findJSFiles(basePathOfTheApplication);
    var jsFileContent = readFiles(jsFileList);
    return jsFileContent;
}

function findJSFiles(dir) {
    var results = [];
    var list = filesystem.readdirSync(dir)
    list.forEach(function (file,index) {
        file = dir + '/' + file;
        var stat = filesystem.statSync(file);
        if (stat && stat.isDirectory()) results = results.concat(findJSFiles(file))
        else if (path.extname(file) === ".js") {
            var name = path.basename(file);
            results.push(new model.SourceFile(index, name, file));
        }
    });
    return results;
}


function readFiles(fileList) {
    var fileWithContent = [];
    fileList.forEach(function (element) {
        var data = filesystem.readFileSync(element.filePath);
        element.setContent(data.toString());
        fileWithContent.push(element);
    });
    return fileWithContent;
}




