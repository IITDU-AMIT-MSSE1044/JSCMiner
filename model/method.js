/**
 * Created by Misu Be Imp on 8/14/2017.
 */
module.exports.Method = Method;

//method Model with
function Method(fileID, fileName, filePath) {
    this.fileID = fileID;
    this.fileName = fileName;
    this.filePath = filePath;

    this.setMethodID = function (methodID) {
        this.methodID = methodID;
    };
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
    this.setMethodLength = function (methodLength) {
        this.methodLength = methodLength;
    };

    this.setTokenFrequencyMap = function (tokenFrequencyMap) {
        this.tokenFrequencyMap = tokenFrequencyMap;
    };
    this.setTokenHashValue = function (tokenHashValue) {
        this.tokenHashValue = tokenHashValue;
    };
    this.setTokenParametricArray = function (tokenParametricArray) {
        this.tokenParametricArray = tokenParametricArray;
    };

    this.setTokenString = function (tokenString ) {
        this.tokenString  = tokenString ;
    };
    this.setIndexString = function (indexString ) {
        this.indexString  = indexString ;
    };

}