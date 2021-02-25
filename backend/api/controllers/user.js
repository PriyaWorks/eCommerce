const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const User = require("../model/user.model");

exports.signup = (req, res, next) => {
   bcrypt.hash(req.body.password, 10).then(hash => {
     console.log("inside bcrypt")
     const user = new User({
        name : req.body.name,
        type : req.body.type,
        email : req.body.email,
        password : hash,
        confirmPassword : hash
      });
    user.save()
      .then( result => {
        result: result
        const token = jwt.sign({name: req.body.name, type: req.body.type}, 
          "secret_this_should_be_longer",
          { expiresIn: "1h"});
          res.status(200).json({
            token: token,
            expiresIn: 3600,
            name: req.body.name,
            type: req.body.type,
            message: "Successfully authenticated!"
          });
      });
    })
      .catch(err => {
        res.status(500).json({
          error: err,
          message: "Invalid authentication credentials!"
        });
      });
      
}

exports.signin = (req,res,next) => {
  let fetchedUser;
User.findOne({ email: req.body.email })
  .then( user => {
    if(!user){
      return res.status(401).json({
        message: 'Authentication failed!'
      });
    }
    fetchedUser = user;
    // console.log(fetchedUser);
    return bcrypt.compare(req.body.password, user.password);
  })
  .then(result => {
    if(!result) {
      return res.status(401).json({
        message: 'Authentication failed!'
      });
    }
    // console.log(result);

    const token = jwt.sign({name: fetchedUser.name, type: fetchedUser.type}, 
      "secret_this_should_be_longer",
      { expiresIn: "1h"});
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        name: fetchedUser.name,
        type: fetchedUser.type
      });
  })
  .catch(err => {
    return res.status(401).json({
      message: 'Authentication failed!'
    }); 
  });
}



