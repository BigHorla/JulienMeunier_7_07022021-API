const { Sequelize } = require("sequelize");

//You need to put data in '.env' file
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
  } catch (error) {
    console.error("☹️ Erreur de connection à la base de données:", error);
  }
};

databaseConnectionTest();

//Models
const User = require("./models/User");
const Article = require("./models/Article.js");
const Comment = require("./models/Comment.js");

const reset = false; // <--------------------------------------------------------------------------------------------
if(reset){
  console.log("💣  Réinitialisation des modéles... ")
  try{
    User.sequelize.sync({ force: true });
    Article.sequelize.sync({ force: true });
    Comment.sequelize.sync({ force: true });
  }catch{
    console.log("⚠️ Problème lors da la réinitialisation des modèles ❌")
  }
}

//!  |‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|
//!  | FOLOWING SECTION FOR DEMO ONLY |
//!  |  (add fake users in API DB)    |
//!  |________________________________|

const demo = false; // <--------------------------------------------------------------------------------------------

if(demo){
  console.log("👨‍👨‍👧‍👧  Création d'utilisateurs pour la demo 👨‍👨‍👧‍👧")
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
  setTimeout(()=>{
    userSignin('$2b$10$fG3sTA3LLXvloAuarcLql.bIaXdHNbRH9QTCCuCPXKqvSrXMey4HG', 'jean.peuplu@mail.com','Peuplu','Jean','Technicien');
    userSignin('$2b$10$fG3sTA3LLXvloAuarcLql.bIaXdHNbRH9QTCCuCPXKqvSrXMey4HG', 'martha.krobat@mail.com','Krobat','Martha','Coordinatrice');
    userSignin('$2b$10$fG3sTA3LLXvloAuarcLql.bIaXdHNbRH9QTCCuCPXKqvSrXMey4HG', 'guy.larant@mail.com','Larant','Guy','Secrétaire');
    userSignin('$2b$10$fG3sTA3LLXvloAuarcLql.bIaXdHNbRH9QTCCuCPXKqvSrXMey4HG', 'jeanne.eserge@mail.com','Eserge','Jeanne','Assitante RH');
    userSignin('$2b$10$fG3sTA3LLXvloAuarcLql.bIaXdHNbRH9QTCCuCPXKqvSrXMey4HG', 'kevin.dapleiss@mail.com','Dapleiss','Kevin','Service Client');
    userSignin('$2b$10$fG3sTA3LLXvloAuarcLql.bIaXdHNbRH9QTCCuCPXKqvSrXMey4HG', 'enzo.tarri@mail.com','Tarri','Enzo','Directeur de vente');
    userSignin('$2b$10$fG3sTA3LLXvloAuarcLql.bIaXdHNbRH9QTCCuCPXKqvSrXMey4HG', 'nathalie.baba@mail.com','Baba','Nathalie','Commerciale');
    userSignin('$2b$10$fG3sTA3LLXvloAuarcLql.bIaXdHNbRH9QTCCuCPXKqvSrXMey4HG', 'michelle.festt@mail.com','Festt','Michelle','Service Client');
    userSignin('$2b$10$fG3sTA3LLXvloAuarcLql.bIaXdHNbRH9QTCCuCPXKqvSrXMey4HG', 'sophie.losophe@mail.com','Losophe','Sophie','Comptable');
    userSignin('$2b$10$fG3sTA3LLXvloAuarcLql.bIaXdHNbRH9QTCCuCPXKqvSrXMey4HG', 'paul.leolet@mail.com','Leolet','Paul','Service Marketing');
    userSignin('$2b$10$fG3sTA3LLXvloAuarcLql.bIaXdHNbRH9QTCCuCPXKqvSrXMey4HG', 'thomas.sticko@mail.com','Sticko','Thomas','Technicien');
    userSignin('$2b$10$fG3sTA3LLXvloAuarcLql.bIaXdHNbRH9QTCCuCPXKqvSrXMey4HG', 'yacine.hoche@mail.com','Hoche','Yacine','Coordinateur');
    userSignin('$2b$10$fG3sTA3LLXvloAuarcLql.bIaXdHNbRH9QTCCuCPXKqvSrXMey4HG', 'reda.xion@mail.com','Xion','Reda','Secrétaire');
    userSignin('$2b$10$fG3sTA3LLXvloAuarcLql.bIaXdHNbRH9QTCCuCPXKqvSrXMey4HG', 'jessica.rotte@mail.com','Rotte','Jessica','Assitante RH');
    userSignin('$2b$10$fG3sTA3LLXvloAuarcLql.bIaXdHNbRH9QTCCuCPXKqvSrXMey4HG', 'dolly.prane@mail.com','Prane','Dolly','Service Client');
  }, 1000)


}
//----