var path = require('path');
async = require('async');
newman = require('newman');
 // Change Hits to the number of times you'd like to execute the postman script. Increase parallel if you feel like getting wild.
var config = {
    hits: 50,
    parallel: 10
}
options = {
    collection: path.join(__dirname, 'run.json'),
    reporters: 'cli',
    iterationCount: config.hits
},
parallelCollectionRun = function (done) {
    newman.run(options, done);
};
var addarray = [];
for (let run = 0; run < config.parallel; run++) {
    addarray.push(parallelCollectionRun)
}
// Runs the Postman sample collection, in parallel.
async.parallel(addarray,
    function (err, result) {
    err && console.error(err);
    result.forEach(function (result) {
        var failures = result.run.failures;
        console.info(failures.length ? JSON.stringify(failures.failures, null, 2) : `${result.collection.name} ran successfully.`);
    });
});
