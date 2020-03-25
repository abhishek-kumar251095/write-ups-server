const server = require('./StartUp/server'),
      db = require('./StartUp/db');

require('dotenv').config();

(async function init(){

    console.log("Starting server...");
    await server();

    console.log("Connecting to Database...");
    await db.dbConnect();

})();
