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
app.use("/img", express.static("img")); 

//-----------------------------------------------------
//USERS ROUTES
const userRoutes = require('./routes/userRoutes')
app.use('/api/auth', userRoutes);

//ARTICLES ROUTES
const articleRoutes = require('./routes/articleRoutes')
app.use('/api/article/', articleRoutes);

//COMMENTS ROUTES
const commentRoutes = require('./routes/commentRoutes')
app.use('/api/comment/', commentRoutes);

//-----------------------------------------------------
//Exports
module.exports = app; 