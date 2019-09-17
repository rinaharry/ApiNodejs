const express = require('express');
const bodyParser = require('body-parser')
const route = require('./route/index')
const errorServer = require('./route/errorServer')
const errorNotFound = require('./route/errorNotFound')
const dbconnect = require('./configs/mongoose.connect')
const environement = require('./configs/environement')
//const server = require ('./configs/server.config')
const app = express();


dbconnect(()=>{
app.all('/*', (req, res, next)=> {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key,Authorization');

    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false }));
app.use('/',route);
app.use(errorNotFound);
app.use(errorServer)

app.listen(environement.port,() => {
    console.log(`app listen in port ${environement.port}`)
})
})