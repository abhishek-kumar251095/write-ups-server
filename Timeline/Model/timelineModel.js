const mongoose = require('mongoose'),
      schema = mongoose.Schema;

const timelineSchema = new schema({
    userId: {
        type: Number
    },
    entryId:{
        type: String
    },
    type: {
        type: String
    },
    date: {
        type: Date
    },
    title: {
        type: String
    },
    activity: {
        type: String
    }
});

const timelineModel = mongoose.model("timeline", timelineSchema);
module.exports = timelineModel;