const passport = require('passport'),
      reqModel = require('../authentication/Model/user.model'),
      passportConfig = require('../authentication/passport');

module.exports = async function(app){
    
    app.use(passport.initialize());
    
    return app;
}
      