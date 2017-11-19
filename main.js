var configurator= require('./src/jscminer-configurator/parameter-configuration');
configurator.getConfiguration();


/*
var cloneDetector=require('./src/clone-detector/interface-clone-detector');

var data = {
    cloneType:"Type-1",
    granularity:"function-level",
    cloneReportType:"JSON",
    minimumTokens: 0,
    maximumTokens: 0,
    minimumLines: 5,
    maximumLines:10000,
    threshold:0.80,
    basePath:process.cwd()
};

cloneDetector.detectClones(data);*/
