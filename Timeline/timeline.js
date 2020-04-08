const mongoose = require('mongoose'),
      reqModel = require('./Model/timelineModel'),
      timelineModel = mongoose.model('timeline');

exports.getTimelineData = function(req,res){

    const userId = mongoose.Types.ObjectId(req.payload._id);

    timelineModel
        .find({'userId': userId})
        .exec()
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.json(err);
        });
}

exports.postTimelineData = function(req,res){

    const userId = mongoose.Types.ObjectId(req.payload._id);
    req.body.userId = userId
    timelineModel
        .create(req.body)
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.json(err);
        })

}