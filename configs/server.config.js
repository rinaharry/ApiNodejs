const route = require('../route/index')
const express = require('express');
const bodyParser = require('body-parser')

class App
   {
    constructor() {
        this.app = express();
    }
     init () {
       this.initMiddlewares();
       this.initRoutes();
       return this.app;
    }

     initMiddlewares(){
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended:false }));
      }
      
     initRoutes(){
        this.app.use('/',route);
     }

}
module.exports = new App();