var path = require('path');
async = require('async');
newman = require('newman');
 // Change Hits to the number of times you'd like to execute the postman script. Increase parallel if you feel like getting wild.
var config = {
    hits: 50,
    parallel: 10
}
/**
 * A set of collection run options for the paralle collection runs. For demonstrative purposes in this script, an
 * identical set of options has been used. However, different options can be used, so as to actually run different
 * collections, with their corresponding run options in parallel.
 *
 * @type {Object}
 */
options = {
    collection: path.join(__dirname, 'run.json'),
    reporters: 'cli',
    iterationCount: config.hits
},
/**
 * A collection runner function that runs a collection for a pre-determined options object.
 *
 * @param {Function} done - A callback function that marks the end of the current collection run, when called.
 */
parallelCollectionRun = function (done) {
    newman.run(options, done);
};
var addarray = [];
for (let run = 0; run < config.parallel; run++) {
    addarray.push(parallelCollectionRun)
}
// Runs the Postman sample collection thrice, in parallel.
async.parallel(addarray,
/**
 * The
 *
 * @param {?Error} err - An Error instance / null that determines whether or not the parallel collection run
 * succeeded.
 * @param {Array} result - An array of collection run summary objects.
 */
    function (err, result) {
    err && console.error(err);
    result.forEach(function (result) {
        var failures = result.run.failures;

        console.info(failures.length ? JSON.stringify(failures.failures, null, 2) :
            `${result.collection.name} ran successfully.`);
    });
});