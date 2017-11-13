module.exports.startProgressBar=startProgressBar;
var ProgressBar = require('progress');
var colors = require('colors');

function startProgressBar(appName,tickInmiliSeconds)
{
    var stringColour='Detecting  clones [:bar] :percent :etas'.white.bold;
    var progressBar = new ProgressBar(stringColour, {
        complete: '=',
        incomplete: ' ',
        width:35,
        total:50
    });
    var timer = setInterval(function () {
        progressBar.tick();
        if (progressBar.complete) {
            console.log((appName + ' clones are detected successfully\n').green.bold);
            clearInterval(timer);
        }
    },tickInmiliSeconds);

}