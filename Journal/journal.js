const mongoose = require('mongoose'),
      reqModel =  require('../Journal/Model/journalModel');
      journalModel = mongoose.model('journalData');

exports.getJournalData = function(req, res){

    return journalModel
            .find({})
            .exec()
            .then(result => {
                res.json(result);
                console.log(result);
            })
            .catch(err => {
                console.log(err);
            })

}

exports.postJournalData = function(req, res){
    
    return journalModel
            .create(req.body)
            .then(result => {
                res.json(result);
            })
            .catch(err => {
                console.log(err);
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
                console.log(err);
            });
}