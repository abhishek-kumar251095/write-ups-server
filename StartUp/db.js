const mongoose = require('mongoose');

exports.dbConnect = async function(){

    mongoose.connect(process.env.DBCONNECT + '&w=majority')
        .then(() => {
            console.log('Connection to database successful');
        })
        .catch((err) => {
            console.log(`Database connection failed: ${err}`);
        })
}