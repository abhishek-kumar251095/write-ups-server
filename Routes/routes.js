const journalController = require('../Journal/journal'),
      timelineController = require('../Timeline/timeline')

module.exports = async function(app){
    
    app.route('/journal')
        .get(journalController.getJournalData)
        .post(journalController.postJournalData);

    app.route('/journal/:id')
        .get(journalController.getJournalDataById);

    app.route('/timeline')
        .get(timelineController.getTimelineData)
        .post(timelineController.postTimelineData);
}



