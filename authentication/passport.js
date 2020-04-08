const passport = require('passport'),
      passportLocal = require('passport-local').Strategy,
      mongoose = require('mongoose'),
      user = mongoose.model('user');

const passportConfig = function(username, password, done){

    user.findOne({username: username})
        .exec()
        .then(res => {
            if (!res) {
                return done(null, false, {
                    user: null,
                    message: 'User doesn\'t exist!'
                })
            }
            const userModel = new user();
            Object.assign(userModel, res);
            if (!res.validatePassword(password)) {
                return done(null, false, {
                    user: null,
                    message: 'Invalid password!'
                })
            }

            return done(null, {
                user: res,
                message: 'User authenticated'
            })
        })
        .catch(err => {
            return done(err);
        })
}

passport.use(new passportLocal(passportConfig));