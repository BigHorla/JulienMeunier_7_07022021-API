const { Sequelize } = require("sequelize");
require('dotenv').config()
const db_name = process.env.DB_DBNAME;
const db_username = process.env.DB_USER;
const db_password = process.env.DB_PASS;

console.log('\033[2J'); //console cleaning

module.exports = sequelize = new Sequelize(db_name, db_username, db_password, {
  host: "localhost",
  dialect: "mysql",
});

const databaseConnectionTest = async () => {
  
  console.log("🚦 Connection avec la base de donnée...");
  try {
    await sequelize.authenticate();
    console.log("⚡️  Base de données connectée ✔️");
    console.log("-------------------------------")
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
//! for dev only 
// TODO : clean this before production

const reset = false;

const userSignin = async (
  user_password,
  user_email,
  user_lastName,
  user_firstName,
  user_job
) => {
  try {
    await User.create({
      password: user_password,
      email: user_email,
      lastName: user_lastName,
      firstName: user_firstName,
      job: user_job,
    });
    console.log(`Utilisateur ajouté 🥳`);
  } catch (err) {
    console.log("💥 Il y a un porblème ici 😕");
    console.log(err);
  }
};

if(reset){
  User.sequelize.sync({ force: true });
  Article.sequelize.sync({ force: true });
  Comment.sequelize.sync({ force: true });

  userSignin('$2b$10$fG3sTA3LLXvloAuarcLql.bIaXdHNbRH9QTCCuCPXKqvSrXMey4HG', 'thebest@mail.com','Dupond','Jean','Technicien');
  userSignin('$2b$10$fG3sTA3LLXvloAuarcLql.bIaXdHNbRH9QTCCuCPXKqvSrXMey4HG', 'coolguy@mail.com','Vladinsky','Martha','Coordinatrice');
  userSignin('$2b$10$fG3sTA3LLXvloAuarcLql.bIaXdHNbRH9QTCCuCPXKqvSrXMey4HG', 'iloverocknrolly@mail.com','Centfran','Guy','Secrétaire');
  userSignin('$2b$10$fG3sTA3LLXvloAuarcLql.bIaXdHNbRH9QTCCuCPXKqvSrXMey4HG', 'bobidibabidibou@mail.com','Dupres','Jeanne','Assitante RH');
  userSignin('$2b$10$fG3sTA3LLXvloAuarcLql.bIaXdHNbRH9QTCCuCPXKqvSrXMey4HG', 'sakatune@mail.com','Aboubou','Serge','Service Client');
  userSignin('$2b$10$fG3sTA3LLXvloAuarcLql.bIaXdHNbRH9QTCCuCPXKqvSrXMey4HG', 'randominion@mail.com','Durand','Enzo','Directeur de vente');
  userSignin('$2b$10$fG3sTA3LLXvloAuarcLql.bIaXdHNbRH9QTCCuCPXKqvSrXMey4HG', 'cocktailauboulot@mail.com','Bobi','Nathalie','Commerciale');
  userSignin('$2b$10$fG3sTA3LLXvloAuarcLql.bIaXdHNbRH9QTCCuCPXKqvSrXMey4HG', 'fan2garou@mail.com','Plato','Michelle','Service Client');
  userSignin('$2b$10$fG3sTA3LLXvloAuarcLql.bIaXdHNbRH9QTCCuCPXKqvSrXMey4HG', 'plutomickey@mail.com','Farfouille','Sophie','Comptable');
  userSignin('$2b$10$fG3sTA3LLXvloAuarcLql.bIaXdHNbRH9QTCCuCPXKqvSrXMey4HG', 'tropstar@mail.com','Maison','Paul','Service Marketing');

}
//----