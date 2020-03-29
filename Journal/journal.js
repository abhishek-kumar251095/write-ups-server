const mongoose = require('mongoose'),
      reqModel =  require('../Journal/Model/journalModel');
      journalModel = mongoose.model('journalData');

exports.getJournalData = function(req, res){

    return journalModel
            .find({})
            .exec()
            .then(result => {
                res.json(result);
            })
            .catch(err => {
                res.json(err);
            })

}

exports.postJournalData = function(req, res){
    
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

    return journalModel
            .findOne({'_id': id})
            .exec()
            .then(result => {
                res.json(result);
                console.log(result);
            })
            .catch(err => {
                res.json(err);
            });
}

exports.editJournalData = function(req, res){

    let id = mongoose.Types.ObjectId(req.body._id);

    return journalModel
            .updateOne(
                {'_id': id}, 
                {
                    'userId': req.body.userId,
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