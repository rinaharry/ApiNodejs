const jwt = require('jsonwebtoken');
const  bcrypt = require ('bcrypt');
const express = require ('express')
const User = require('../model/user')

const loginRoute= express.Router()

loginRoute.post('/login', async(req,res, next)=>{
    const user = req.body
  console.log(user)
    try {
        const  loggin = await User.findOne({email: user.email})
        if(!loggin){
              res.status(400).send({
                  message: "user not found",
                  status: 400,
                  data: ""
              })
        }else {
            let validPassword = await bcrypt.compare(req.body.password, loggin.password);
            if (!validPassword){
                res.status(400).send({
                   message: "password not valid",
                   status: 400
                })
            } else {
             const token = jwt.sign({userId: loggin._id ,maricule: user.matricule},'okokok',{ expiresIn: '121h' });
                 res.status(200).send({
                     token:token,
                     userId: loggin._id,
                     tokenExpiration: 1 
                 })
           }   
        }
    } catch (error) {
        res.status(400).send({
            message: error,
            status: 400
        })
    }
   
})

module.exports= loginRoute