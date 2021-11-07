'use strict'

const base64 = require('base-64');
const bcrypt = require('bcrypt');
const {user} = require('../models/index')

module.exports= async(req,res,next)=>{

    const basicHeaderParts = req.headers.authorization.split(' ');
    
    if(basicHeaderParts[0] !== 'Basic'){
        next('Wrong Authorization header')
    }
    let decodedString=base64.decode(basicHeaderParts[1]);
    let [username,password]=decodedString.split(':');

    const userClient = await user.findOne({ where: {username} });
    if(!userClient){
        next('Invalid Username/Password')
    }else{
    const valid = await bcrypt.compare(password, userClient.password);
    if(valid){
        next();
    }else{
        next('Invalid Username/Password')
    }
}
}

