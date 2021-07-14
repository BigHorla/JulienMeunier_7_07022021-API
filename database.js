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
    console.log("⚡️  Base de données connectée ⚡️");
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

const reset = false  // <--------------------------------------------------------------------------------------------
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
//!  |  (add fake content in API DB)  |
//!  |________________________________|

const demo = false // <--------------------------------------------------------------------------------------------

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
    userSignin('$@FAKE-USER@$', 'jean.peuplu@mail.com','Peuplu','Jean','Technicien');
    userSignin('$@FAKE-USER@$', 'martha.krobat@mail.com','Krobat','Martha','Coordinatrice');
    userSignin('$@FAKE-USER@$', 'guy.larant@mail.com','Larant','Guy','Secrétaire');
    userSignin('$@FAKE-USER@$', 'jeanne.eserge@mail.com','Eserge','Jeanne','Assitante RH');
    userSignin('$@FAKE-USER@$', 'kevin.dapleiss@mail.com','Dapleiss','Kevin','Service Client');
    userSignin('$@FAKE-USER@$', 'enzo.tarri@mail.com','Tarri','Enzo','Directeur de vente');
    userSignin('$@FAKE-USER@$', 'nathalie.baba@mail.com','Baba','Nathalie','Commerciale');
    userSignin('$@FAKE-USER@$', 'michelle.festt@mail.com','Festt','Michelle','Service Client');
    userSignin('$@FAKE-USER@$', 'sophie.losophe@mail.com','Losophe','Sophie','Comptable');
    userSignin('$@FAKE-USER@$', 'paul.leolet@mail.com','Leolet','Paul','Service Marketing');
    userSignin('$@FAKE-USER@$', 'thomas.sticko@mail.com','Sticko','Thomas','Technicien');
    userSignin('$@FAKE-USER@$', 'yacine.hoche@mail.com','Hoche','Yacine','Coordinateur');
    userSignin('$@FAKE-USER@$', 'reda.xion@mail.com','Xion','Reda','Secrétaire');
    userSignin('$@FAKE-USER@$', 'jessica.rotte@mail.com','Rotte','Jessica','Assitante RH');
    userSignin('$@FAKE-USER@$', 'dolly.prane@mail.com','Prane','Dolly','Service Client');
  }, 1000)

  console.log("📋  La création d'articles pour la demo... 📜");
  const newArticle = async (user, title, content) => {
    Article.create({
        AuthorId: user,
        title : title,
        content : content,
    })
};

setTimeout(()=>{
  newArticle(1, "Plan de relance", "Un plan de relance des ventes a été mis en place. Merci à tous.tes pour ce beau travail.");
  newArticle(3, "Bilan sur la prime", "Nous sommes entrain de voir si l'objectif a été atteint pour la prime d'intéressement");
  newArticle(6,"Nouveau Design", "Bientôt un nouveau logo pour la boite !");
  newArticle(9,"Enfin !", "J'ai un nouveau téléphone !");
  newArticle(10,"C'était tendu !", "Nous avons décroché le contrat avec GOOGLE ! Incroyable !");
  newArticle(2,"Je cherche des équipiers", "Qui veut monter une équipe de foot ?");
  newArticle(15,"Formation pour tous le monde !", "Le nouveau logiciel de gestion des heures est déployé, une formation vous sera envoyée par email.");
  newArticle(14,"Place de Parking.", "Je cherche une place de parking dans le coin, quelqu'un à un tuyau pour moi ?");
  newArticle(13,"Des idées ?", "Le CSE cherche des idées qui ferait plaisir pour noël ! Contactez moi si quelque chose vous traverse l'esprit !");
  newArticle(12,"On boit un coup ?", "Qui est chaud pour boire un coup mercredi après le taf ? (ou pendant... ;p)");
  newArticle(11,"On l'a fait !", "La mission marketng est une veritable victoire");
  newArticle(10,"On recrute !", "Nous recrutons 2 nouvelles personne au poste de Dev Web, parlez en à vos connaissances du secteur !");
  newArticle(9,"Besoin d'aide...", "Quelqu'un s'y connait en smartphone ? Je trouve plus mes photos");
  newArticle(8,"Fermeture annuelle", "Cette année nous fermerons du 7 au 21 Aout.");
  newArticle(7,"Stagiaire de 3eme", "Nous avons plein de stagiaires qui postulent. Si quelqu'un veut bien en prendre un faites signe !");
  newArticle(6,"Nouveau Logo", "N'oubliez pas d'aller voter pour notre nouveau logo ! c'est jusqu'à vendredi !");
  newArticle(5,"Je vend ma voiture", "Je vends ma voiture, si quelqu'un cherche une clio contactez moi !");
  newArticle(4,"Qui à perdu son badge ?", "J'ai trouvé un badge pour la photocopieuse ! Je l'ai déposé à l'acceuil.");
  newArticle(3,"La prime est là", "Les objectifs ont été atteints ! La prime arrive en septembre !");
  newArticle(2,"Tournois de foot", 'Les inscriptions pour le "Groupomania tounament" sont ouvertes');
  newArticle(1,"Alors ?", "On en est où du plan de relance ? Quelqu'un à des news ?");
}, 1000)


}
//----