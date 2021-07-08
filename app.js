//Imports
const express = require('express');
const cors = require('cors')
const app = express();

//Imports [SECURITY]
const helmet = require('helmet');

//Database 
require('./database');

//-----------------------------------------------------
//CORS
app.use(cors())

//-----------------------------------------------------
//Middleware utilities
app.use(helmet());// Hide Express in request headers
app.use(express.json());// For parsing request

//To see incomming request in log :
app.use('/', (req, res, next) => {
  console.log("✉️  requête entrante ...");
  next();
})

//-----------------------------------------------------
//users ROUTES
const userRoutes = require('./routes/userRoutes')
app.use('/api/auth', userRoutes);

//-----------------------------------------------------
//Exports
module.exports = app; 