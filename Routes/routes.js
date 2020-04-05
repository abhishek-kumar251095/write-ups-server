const journalController = require('../Journal/journal'),
      timelineController = require('../Timeline/timeline'),
      authController = require('../authentication/authentication');

module.exports = async function(app){
    
    app.route('/journal')
        .get(journalController.getJournalData)
        .post(journalController.postJournalData)
        .put(journalController.editJournalData)

    app.route('/journal/:id')
        .get(journalController.getJournalDataById);

    app.route('/timeline')
        .get(timelineController.getTimelineData)
        .post(timelineController.postTimelineData);
    
    app.route('/user/login')
        .post(authController.login);
    
    app.route('/user/register')
        .post(authController.register);
}



