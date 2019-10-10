const User = require('../model/user')
const express = require('express')
const bcrypt = require('bcrypt')
const auth = require('../midlware/authConfig')

const routeUser = express.Router()

routeUser.get('/', async(req, res)=>{

  try {
    const users = await User
         .find()
         .select('-password')

   if(users) {
       res.status(200).send({
           data: users,
           message: "user ok",
           status: 200
       })
   } else{
    res.status(400).send({
        message: "user not ok",
        status: 400
    })
   } 
  } catch(err){
    res.status(400).send({
        message: "user not ok",
        status: 400,
        data: err
    })
  }
})

routeUser.put('/:id/activedesactive', async(req, res)=>{
    try {
        let  user = await User.findOne({_id: req.params.id})
             if (!user) {
                 res.status(400).send({
                     message: "user not found "
                 })
             } else {
                user.status = !req.body.status
               // console.log(user)
                const userUpdate = await user.save()      
                res.status(200).send({
                data:userUpdate 
             })
        }
      } catch(err) {
          res.status(400).send(
              {
                 message: err
              }
          )
      }
})
routeUser.post('/', async(req, res) => {

  //console.log(req.headers)
    try {
        let user = req.body;
        bcryptpass = await bcrypt.hash(user.password, 10)
        user.password = bcryptpass
        user = new User({
            ... user
        })
        const newuser = await user
                         .save()
            
        if(newuser) {
            newuser.password = null
            res.status(200).send({
                data: newuser,
                status: 200,
          })
      } else {
        res.status(400).send({
            message: "user not save",
            status: 400,
        }) 
    }
    } catch(err){
        res.status(400).send({
            message: "user not save",
            status: 400,
            data: err
        })
    }    
})

routeUser.put('/:id', async (req, res) => {
  //console.log(req.params.id)
  try {
    let  user = await User.findOne({_id: req.params.id})
         if (!user) {
             res.status(400).send({
                 message: "user not found "
             })
         } else {
            Object.assign(user, req.body)
            const userUpdate = await user.save()      
            res.status(200).send({
            data:userUpdate 
         })
    }
  } catch(err) {
      res.status(400).send(
          {
             message: err
          }
      )
  }   
})

routeUser.delete('/:id', async (req, res) => {
    
    try {
        let  userdelete = await User.findOne({_id: req.params.id})
        if(userdelete){
        const user = await User.deleteOne({_id: req.params.id})
        if(!user){
            res.status(400).send({
                data: "user not found",
                status: 400
            })
        } else {
            res.status(200).send({
                data: user,
                status: 200,
                message: "user delete"
            }) 
        }} else {
            res.status(400).send({
                data: "user not found",
                status: 400
            })
        }
    } catch (error) {
        res.status(400).send({
            data : error,
            status: 400
        })
    }
})

module.exports = routeUser;