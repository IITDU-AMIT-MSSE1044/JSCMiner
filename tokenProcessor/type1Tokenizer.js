module.exports.getTokenSingleInLine = getTokenSingleInLine;
module.exports.getHasHValueOfToken=getHasHValueOfToken;
module.exports.getNormalTokenObjectArray=getNormalTokenObjectArray;


var esprima = require('esprima');
var encoder = require('./hasingTokenizer');
var tokenizer=require('./tokenizer');


function getHasHValueOfToken(tokenString) {
    var tokenInLine = getTokenSingleInLine(tokenString);
    var hashCode = encoder.getMD5HashCode(tokenInLine);
    return hashCode;
}
function getTokenSingleInLine(tokenString) {
    var token = "";
    var tokenList = tokenizer.getTokenList(tokenString);
    tokenList.forEach(function (element) {
        token += element;
    });
    return token.toLocaleLowerCase();

}
function getNormalTokenObjectArray(code) {
    var token = esprima.tokenize(code);
    return token;
}