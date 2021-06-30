const { Sequelize } = require("sequelize");
require('dotenv').config()
const db_name = process.env.DB_DBNAME;
const db_username = process.env.DB_USER;
const db_password = process.env.DB_PASS;

module.exports = sequelize = new Sequelize(db_name, db_username, db_password, {
  host: "localhost",
  dialect: "mysql",
});

const databaseConnectionTest = async () => {
  console.log("🚦 Connection avec la base de donnée...");
  try {
    await sequelize.authenticate();
    console.log("📋 Base de données connectée 📦");
    /* sequelize.close() */
  } catch (error) {
    console.error("☹️ Erreur de connection à la base de données:", error);
  }
};

databaseConnectionTest();

//---------------------------------------
//Models
const User = require("./models/User");
const Article = require("./models/Article.js");
const Comment = require("./models/Comment.js");

//For reset models and datas
const reset = false;
if(reset){
  User.sequelize.sync({ force: true });
/*   Article.sequelize.sync({ force: true });
  Comment.sequelize.sync({ force: true }); */
}
//----