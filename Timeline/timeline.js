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

    let modifiedReq = transformRequest(req.body);

    timelineModel
        .findOneAndUpdate(
            {
                "userId": modifiedReq.userId, 
                "dateObj": modifiedReq.dateObj
            },
            {
                "$set": {
                    "userId": modifiedReq.userId, 
                    "dateObj": modifiedReq.dateObj
                },
                "$push": {"body": modifiedReq.body}
            },
            {
                upsert: true
            }
        )
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.json(err);
        })
}

function transformRequest(req) {

    let currDate = new Date(req.date);
    let dateObj = {
        year: currDate.getFullYear(),
        month: currDate.getMonth(),
        date: currDate.getDate(),
        day: currDate.getDay()
    } 

    let transformedObj = {
        userId: req.userId,
        dateObj: dateObj,
        body: {title: req.title, activity: req.activity, type: req.type, entryId: req.entryId}
    }
   
    return transformedObj;

}