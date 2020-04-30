const mongoose = require('mongoose'),
      reqModel =  require('../Journal/Model/journalModel');
      journalModel = mongoose.model('journalData');

exports.getJournalData = function(req, res){

    const userId = mongoose.Types.ObjectId(req.payload._id);

    return journalModel
            .find({'userId': userId})
            .exec()
            .then(result => {
                res.json(result);
            })
            .catch(err => {
                res.json(err);
            })

}

exports.postJournalData = function(req, res){
    
    req.body.userId = mongoose.Types.ObjectId(req.payload._id);

    return journalModel
            .create(req.body)
            .then(result => {
                res.json(result);
            })
            .catch(err => {
                res.json(err);
            })

}

exports.getJournalDataById = function(req,res){

    const id = mongoose.Types.ObjectId(req.params.id);
    const userId = mongoose.Types.ObjectId(req.payload._id);

    return journalModel
            .findOne({'_id': id, 'userId': userId})
            .exec()
            .then(result => {
                res.json(result);
            })
            .catch(err => {
                res.json(err);
            });
}

exports.editJournalData = function(req, res){

    let id = mongoose.Types.ObjectId(req.body._id);
    const userId = mongoose.Types.ObjectId(req.payload._id);

    return journalModel
            .updateOne(
                {
                    '_id': id,
                    'userId': userId
                }, 
                {
                    'userId': userId,
                    'title': req.body.title, 
                    'content': req.body.content,
                    'length': req.body.length,
                    'tags': req.body.tags,
                    'dateTime': req.body.dateTime
                },
            )
            .then(result => {
                res.json(result)
            })
            .catch(err => {
                res.json(err);
            });
}

exports.getJournalDataByTags = function(req, res) {
    let tag = req.params.tag;
    const userId = mongoose.Types.ObjectId(req.payload._id);
    
    return journalModel
            .find({
                $and: [
                    {"userId": userId},
                    {"tags": tag }
                ]
            })
            .then(result => {
                res.json(result);
            })
            .catch(err => {
                res.json(err);
            })
}