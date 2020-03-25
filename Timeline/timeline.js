const mongoose = require('mongoose'),
      reqModel = require('./Model/timelineModel'),
      timelineModel = mongoose.model('timeline');

exports.getTimelineData = function(req,res){

    timelineModel
        .find({})
        .exec()
        .then(result => {
            res.json(result);
            console.log(result);
        })
        .catch(err => {
            res.json(err);
        });
}

exports.postTimelineData = function(req,res){
    console.log(req.body);
    timelineModel
        .create(req.body)
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.json(err);
        })

}