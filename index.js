var path = require('path');
async = require('async');
newman = require('newman');
newmanTasks = [];

/*
Newman hit count and parallel config.
*/
var config = {
    hits: 50,
    parallel: 10
};
/*
Newman options.
*/
options = {
    collection: path.join(__dirname, 'run.json'),
    reporters: 'cli',
    iterationCount: config.hits
};

/*
Build array of newman tasks.
*/
parallelCollectionRun = done => newman.run(options, done);
for (let run = 0; run < config.parallel; run++) {
    newmanTasks.push(parallelCollectionRun)
};

/*
Async is a utility module which provides straight-forward, 
powerful functions for working with asynchronous JavaScript.
async.parallel(tasks, callback)
*/
async.parallel(newmanTasks,
    function (err, result) {
    err && console.error(err);
    result.forEach(result => {
        var failures = result.run.failures;
        console.info(failures.length ? JSON.stringify(failures.failures, null, 2) : `${result.collection.name} ran successfully.`);
    });
});
