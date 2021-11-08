'use strict'

require('dotenv').config();
const {startServer}=require('./app');
const {db}=require('./auth/models/index')


db.sync().then(()=>{

    startServer(process.env.PORT);
}).catch(console.error);