module.exports.getTokenFrequencyMap = getTokenFrequencyMap;
module.exports.getTokenIndexPortion=getTokenIndexPortion;



var tokenizer=require('./tokenizer');

function getTokenFrequencyMap(methodCode) {
    "use strict";
    var tokenList = tokenizer.getTokenList(methodCode);
    var tokenFrequencyMap = tokenizer.getTokenFrequency(tokenList);
    return tokenFrequencyMap;
}

function getTokenIndexPortion(tokenFrequencyMap, threshold)
{
    "use strict";
    var tokenLength=tokenFrequencyMap.size;
    var subBlockLength=Math.round(tokenLength-(threshold*tokenLength)+1);
    var tokenArray= new Array();
    tokenFrequencyMap.forEach(function (value, key, mapObj) {
        tokenArray.push(key);
    });

    tokenArray=tokenArray.splice(0,subBlockLength);
    return tokenArray.toString().replace("[").replace("]");
}

