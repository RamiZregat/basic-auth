'use strict';

// 3rd Party Resources
const express = require('express');
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const { signUp,signIn } = require('./auth/routes/userRoutes');
const signinValditor=require('./auth/middleware/signinValditor')
const errorHandler = require('./auth/handlers/500');
const notFoundHandler = require('./auth/handlers/404');



// Prepare the express app
const app = express();

// Process JSON input and put the data on req.body
app.use(express.json());


// Process FORM intput and put the data on req.body
app.use(express.urlencoded({ extended: true }));


app.use('/signup',signUp)
app.use('/signin',signinValditor,signIn)

app.get('/', (req, res) => {
    res.status(200).send('Home route');
  });

// make sure our tables are created, start up the HTTP server.
function startServer(PORT){
    app.listen(PORT, () => console.log('server up')); 
}

app.use('*', errorHandler);
app.use(notFoundHandler);

  module.exports={
      startServer,
      app
    }