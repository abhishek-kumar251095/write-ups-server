const journalController = require('../Journal/journal'),
      timelineController = require('../Timeline/timeline'),
      authController = require('../authentication/authentication'),
      jwt = require('express-jwt');


module.exports = async function(app){

    const auth = jwt({
        secret: process.env.AUTH_KEY,
        userProperty: 'payload'
      });

    app.route('/journal')
        .get(auth, journalController.getJournalData)
        .post(auth, journalController.postJournalData)
        .put(auth, journalController.editJournalData)

    app.route('/journal/:id')
        .get(auth, journalController.getJournalDataById);

    app.route('/journal/tag/:tag')
        .get(auth, journalController.getJournalDataByTags);

    app.route('/timeline')
        .get(auth, timelineController.getTimelineData)
        .post(auth, timelineController.postTimelineData);
    
    app.route('/user/login')
        .post(authController.login);
    
    app.route('/user/register')
        .post(authController.register);
}



