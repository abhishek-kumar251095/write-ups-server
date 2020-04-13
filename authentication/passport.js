const passport = require('passport'),
      passportLocal = require('passport-local').Strategy,
      mongoose = require('mongoose'),
      user = mongoose.model('user');

const passportConfig = async function(username, password, done){

    try {

        let userData = await user.findOne({username: username}).exec();

        if (!userData) {
            return done(null, false, {
                user: null,
                message: 'User doesn\'t exist!'
            })
        }

        const userModel = new user();
        Object.assign(userModel, userData);

        let isPasswordValid = await userModel.validatePassword(password);

        console.log(isPasswordValid);

        if (!isPasswordValid) {
            return done(null, false, {
                user: null,
                message: 'Invalid password!'
            })
        }

        return done(null, {
            user: userData,
            message: 'User authenticated'
        })

    } catch (err) {

        console.log(err);

    }
    
}

passport.use(new passportLocal(passportConfig));