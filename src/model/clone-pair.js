module.exports.ClonePair = ClonePair;


function ClonePair(firstMethod, secondMethod, type) {

    this.firstMethod = firstMethod;
    this.secondMethod = secondMethod;
    this.type = type;

    this.getJOSNCloneObject = function () {

        return {
            "cloneType": this.type,
            "elementOne": {
                "name": this.firstMethod.methodName,
                "path": this.firstMethod.filePath,
                "range": {
                    "start":this.firstMethod.startLine,
                    "end":this.firstMethod.endLine
                },
                "code": this.firstMethod.methodCode.toString()
            },
            "elementTwo": {
                "name": this.secondMethod.methodName,
                "path": this.secondMethod.filePath,
                "range": {
                    "start":this.secondMethod.startLine,
                    "end":this.secondMethod.endLine
                },
                "code": this.secondMethod.methodCode.toString()
            }
        };
    };


}
