module.exports.getTokenSingleInLine = getTokenSingleInLine;
module.exports.getHasHValueOfToken=getHasHValueOfToken;
module.exports.getNormalTokenObjectArray=getNormalTokenObjectArray;


var esprima = require('esprima');
var tokenizer=require('./tokenizer');


function getHasHValueOfToken(code) {
    var tokenInLine = getTokenSingleInLine(code);
    var hashCode = getHashCode(tokenInLine);
    return hashCode;
}
function getTokenSingleInLine(code) {
    var token = "";
    var tokenList = tokenizer.getTokenList(code);
    tokenList.forEach(function (element) {
        token += element;
    });
    return token.toLocaleLowerCase();

}
function getNormalTokenObjectArray(code) {
    var token = esprima.tokenize(code);
    return token;
}

function getHashCode(str){
    var hash = 0;
    if (str.length == 0) return hash;
    for (i = 0; i < str.length; i++) {
        char = str.charCodeAt(i);       hash = ((hash<<5)-hash)+char;     hash = hash & hash; // Convert to 32bit integer
    }
    return hash;

}
