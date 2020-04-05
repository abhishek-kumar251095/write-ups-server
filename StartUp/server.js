const express = require('express'),
      port = process.env.PORT || 3000
      app = express(),
      bodyParser = require('body-parser'),
      routes = require('../Routes/routes'),
      cors = require('cors'),
      passport = require('../StartUp/passport');


module.exports =  async function(){

    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());

    app.use(cors());
    
    console.log('Initializing Passport...');
    await passport(app);

    await routes(app);

    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });

    return app;
}
