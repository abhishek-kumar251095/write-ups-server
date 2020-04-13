const passport = require('passport'),
      mongoose = require('mongoose'),
      reqModel = require('./Model/user.model'),
      userModel = mongoose.model('user');

exports.register = async function(req, res) {

    const user = new userModel();

    user.username = req.body.username;
    user.email = req.body.email;

    let setPwd = await user.setPassword(req.body.password);

    return user.save()
            .then(result => {
                res.send({
                    "status": 'Success'
                });
            })
            .catch(err => {
                res.json(err);
            });
}

exports.login = function(req, res) {

    passport.authenticate('local', function(err, result, info){

        if (err) {
            console.log(err);
            res.json(err);
            return;
        }
        
        if (result.message === 'User authenticated') {
            const tempUser = new userModel();
            Object.assign(tempUser, result.user)
            console.log(result.user);
            token = tempUser.generateJwt();
            res.status(200);
            res.json({
              "username": tempUser.username,
              "token" : token
            });

          } else {
            res.status(401).json(info);
          }
    })(req, res);
}