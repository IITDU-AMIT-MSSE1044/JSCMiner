var elasticlunr = require('elasticlunr');
var fs = require('fs');

var idx = elasticlunr(function () {
    this.setRef('id');
    this.addField('title');
    this.addField('body');
});

fs.readFile('example_data.json', function (err, data) {
    if (err) throw err;

    var raw = JSON.parse(data);

    var questions = raw.map(function (q) {
        return {
            id: q.id,
            title: q.title,
            body: q.body

        };
    });

    questions.forEach(function (question) {
        idx.addDoc(question);
    });


    var k=idx.search("Oracle,released,its,latest,database,Oracle", {
        fields: {
            title: {boost: 2},
            body: {boost: 1}
        }
    });

    console.log(k);
    /*fs.writeFile('example_index.json', JSON.stringify(idx), function (err) {
        if (err) throw err;
        console.log('done');
    });*/
});