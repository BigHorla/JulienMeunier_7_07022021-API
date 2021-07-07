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
//Middleware utilitaires
app.use(helmet());//Masque l'utilisation d'express
app.use(express.json());//Pour parser les requètes

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