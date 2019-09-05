var findData = function (callback) {
    ModelA.find({}).exec(function (err, result) {
        ModelB.find().in(result.dataB).exec(function (err, result2) {
            /* Join result2 to result */
            result.dataB = result2;
            callback(err, result);
        });
    });
};

var findData = function (callback) {
    async.waterfall([
        function(next){
            ModelA.find({}).exec(next);
        },
        function(modelAResult, next){
            ModelB.find().in(modelAResult.dataB).exec(function (err, modelBResult) {
                next(err, modelAResult, modelBResult);
            });
        },
        function(modelAResult, modelBResult, next){
            modelAResult.dataB = modelBResult;
            next(null, modelAResult);
        }
    ], callback);
};
