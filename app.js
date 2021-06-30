//Imports
const express = require('express');
const app = express();

//Imports [SECURITY]
const helmet = require('helmet');

//Database 
require('./database');

//-----------------------------------------------------
//CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});

//-----------------------------------------------------
//Middleware utilitaires
app.use(helmet());//Masque l'utilisation d'express
app.use(express.json());//Pour parser les requètes

app.use('/', (req, res, next) => {
  console.log("📡 requête entrante ! 📦");
  next();
})


//-----------------------------------------------------
//users ROUTES
const userRoutes = require('./routes/userRoutes')
app.use('/api/auth', userRoutes);

//-----------------------------------------------------
//Exports
module.exports = app;