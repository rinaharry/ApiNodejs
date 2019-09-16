const express = require('express');
const useroute = require ('./user');
const login = require('./login')
const route =  express.Router();

route.get('/router',(req,res)=> res.status(200).send({status:"api is ok"}));
route.use('/',useroute)
     .use('/',login)

module.exports = route