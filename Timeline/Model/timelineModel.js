const mongoose = require('mongoose'),
      schema = mongoose.Schema;

const timelineSchema = new schema(
    {
        userId: {
            type: String
        },
        dateObj: {year: Number, month: Number, date: Number, day: Number},
        body: [
            {title: String, activity: String, type: String, entryId: String}
        ]
    },
    {typeKey: '$type'}
);

const timelineModel = mongoose.model("timeline", timelineSchema);
module.exports = timelineModel;