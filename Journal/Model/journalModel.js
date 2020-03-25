const mongoose = require('mongoose'),
      schema = mongoose.Schema;

const journalSchema = new schema({

    userId: {
        type: String
    },
    dateTime: {
        type: Date
    },
    title: {
        type: String
    },
    content: {
        type: String
    },
    length: {
        type: String
    },
    tags: {
        type: [String]
    }
});



const journalModel = mongoose.model('journalData', journalSchema);
module.exports = journalModel;


