'use strict'

const {startServer}=require('./app');
const {db}=require('./auth/models/index')

db.sync().then(()=>{

    startServer();
}).catch(console.error);