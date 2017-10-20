/**
 * Created by Misu Be Imp on 8/14/2017.
 */
module.exports.Method=Method;

//method Model with
function Method(fileID, fileName, filePath, methodID) {
    this.fileID = fileID;
    this.fileName = fileName;
    this.filePath = filePath;
    this.methodID = methodID;

    this.setMethodName = function (methodName) {
        this.methodName = methodName;
    };
    this.setStartLine = function (startLine) {
        this.startLine = startLine;
    };
    this.setEndLine = function (endLine) {
        this.endLine = endLine;
    };
    this.setMethodCode = function (methodCode) {
        this.methodCode = methodCode;
    };
    this.setLength = function (length) {
        this.length = length;
    };

}