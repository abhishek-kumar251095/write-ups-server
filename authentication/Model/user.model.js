const mongoose = require('mongoose'),
      schema = mongoose.Schema,
      crypto = require('crypto'),
      jwt = require('jsonwebtoken');

const user = new schema({

    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    hash: {
        type: String,
    },
    salt: {
        type: String
    }
});

user.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
}

user.methods.validatePassword = function(password){
    const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
}

user.methods.generateJwt = function(){
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        username: this.username,
        exp: parseInt(expiry.getTime()/1000)
    }, process.env.AUTH_KEY)
}

const userModel = mongoose.model('user', user);

module.exports = userModel; 