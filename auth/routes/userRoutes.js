'use strict'

const express=require('express')
const userRoutes=express.Router();
const {user}=require('../models/index')
const bcrypt = require('bcrypt');
const base64 = require('base-64');



userRoutes.post('/signup', signUp)
userRoutes.post('/signIn', signIn)

  async function signUp(req,res){
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const record = await user.create(req.body);
        res.status(201).json(record);
      } catch (e) { res.status(403).send("Error Creating User"); }
  }

    async function signIn(req,res){
        let basicHeaderParts = req.headers.authorization.split(' ');
        let decodedString = base64.decode(basicHeaderParts[1]);
        let [username,password]=decodedString.split(':');

        try {
            const userClient = await user.findOne({ where: { username: username } });
            const valid = await bcrypt.compare(password, userClient.password);
            if (valid) {
              res.status(200).json(userClient);
            }
            else {
              throw new Error('Invalid User')
            }
          } catch (error) { res.status(403).send("Invalid Login"); }

    }

module.exports={
    signIn,
    signUp
}

