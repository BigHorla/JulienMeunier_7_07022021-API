//Imports
const express = require('express');
const app = express();

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
app.use(express.json());//Pour parser les requètes

//-----------------------------------------------------
//ROUTES
app.use('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1 style="text-align:center; font-size:4.5vw">👷‍♀️👷 Le serveur fonctionne ! ⚡️💻</h1>');
});

//-----------------------------------------------------
//Exports
module.exports = app;