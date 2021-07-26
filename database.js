const { Sequelize } = require("sequelize");

//You need to put values in '.env' file
require("dotenv").config();
const db_name = process.env.DB_DBNAME;
const db_username = process.env.DB_USER;
const db_password = process.env.DB_PASS;

console.log("\033[2J"); //console cleaning

const timezone = "UTC";

module.exports = sequelize = new Sequelize(db_name, db_username, db_password, {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

const databaseConnectionTest = async () => {
  console.log("🚦 Connection avec la base de donnée...");
  try {
    await sequelize.authenticate();
    console.log("⚡️  Base de données connectée ⚡️");
    console.log("-------------------------------");
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
const demo = false; // <--------------------------------------------------------------------------------------------

if (reset) {
  console.log("💣  Réinitialisation des modéles... ");
  try {
    User.sequelize.sync({ force: true });
    Article.sequelize.sync({ force: true });
    Comment.sequelize.sync({ force: true });
  } catch {
    console.log("⚠️ Problème lors da la réinitialisation des modèles ❌");
  }


  const userSignin = async (
    user_password,
    user_email,
    user_lastName,
    user_firstName,
    user_job,
    user_picture,
    user_role
  ) => {
    try {
      await User.create({
        password: user_password,
        email: user_email,
        lastName: user_lastName,
        firstName: user_firstName,
        job: user_job,
        profileImage: user_picture,
        roles: user_role,
      });
    } catch (err) {
      console.log("💥 Il y a un porblème ici 😕");
      console.log(err);
    }

  };

  setTimeout(() => {
    console.log("⚙️  Création du compte administrateur 👮");
    console.log("⚙️  Identifiant : admin@groupomania.fr 🔒");
    console.log("⚙️  Mot de passe : G@Admin2021 🔑");
    userSignin(
      "$2b$10$7lsDBm9WPlmRXobYxrRqk.VHdjVZOlcUPw31iM2Aftj7fLwYjIMC.",
      "admin@groupomania.fr",
      "",
      "Admin",
      "Administrateur",
      "/img/admin.jpg",
      "admin"
    ).then(() => {
      if (demo) {
        console.log("👨‍👨‍👧‍👧  Création d'utilisateurs pour la demo 👨‍👨‍👧‍👧");
        userSignin(
          "$@FAKE-USER@$",
          "jean.peuplu@mail.com",
          "Peuplu",
          "Jean",
          "Technicien",
          "http://localhost:3000/img/1_1626698589053.png",
          "user"
        );
        userSignin(
          "$@FAKE-USER@$",
          "martha.krobat@mail.com",
          "Krobat",
          "Martha",
          "Coordinatrice",
          "http://localhost:3000/img/2_1626698605148.png",
          "user"
        );
        userSignin(
          "$@FAKE-USER@$",
          "guy.larant@mail.com",
          "Larant",
          "Guy",
          "Secrétaire",
          "http://localhost:3000/img/3_1626698798878.png",
          "user"
        );
        userSignin(
          "$@FAKE-USER@$",
          "jeanne.eserge@mail.com",
          "Eserge",
          "Jeanne",
          "Assitante RH",
          "http://localhost:3000/img/4_1626698809283.png",
          "user"
        );
        userSignin(
          "$@FAKE-USER@$",
          "kevin.dapleiss@mail.com",
          "Dapleiss",
          "Kevin",
          "Service Client",
          "http://localhost:3000/img/5_1626698635654.png",
          "user"
        );
        userSignin(
          "$@FAKE-USER@$",
          "enzo.tarri@mail.com",
          "Tarri",
          "Enzo",
          "Directeur de vente",
          "http://localhost:3000/img/6_1626698824824.png",
          "user"
        );
        userSignin(
          "$@FAKE-USER@$",
          "nathalie.baba@mail.com",
          "Baba",
          "Nathalie",
          "Commerciale",
          "http://localhost:3000/img/7_1626698840272.png",
          "user"
        );
        userSignin(
          "$@FAKE-USER@$",
          "michelle.festt@mail.com",
          "Festt",
          "Michelle",
          "Service Client",
          "http://localhost:3000/img/8_1626698851881.png",
          "user"
        );
        userSignin(
          "$@FAKE-USER@$",
          "sophie.losophe@mail.com",
          "Losophe",
          "Sophie",
          "Comptable",
          "http://localhost:3000/img/9_1626698656351.png",
          "user"
        );
        userSignin(
          "$@FAKE-USER@$",
          "paul.leolet@mail.com",
          "Leolet",
          "Paul",
          "Service Marketing",
          "http://localhost:3000/img/10_1626698675975.png",
          "user"
        );
        userSignin(
          "$@FAKE-USER@$",
          "thomas.sticko@mail.com",
          "Sticko",
          "Thomas",
          "Technicien",
          "http://localhost:3000/img/11_1626698694137.png",
          "user"
        );
        userSignin(
          "$@FAKE-USER@$",
          "yacine.hoche@mail.com",
          "Hoche",
          "Yacine",
          "Coordinateur",
          "http://localhost:3000/img/12_1626698716421.png",
          "user"
        );
        userSignin(
          "$@FAKE-USER@$",
          "reda.xion@mail.com",
          "Xion",
          "Reda",
          "Secrétaire",
          "http://localhost:3000/img/13_1626698730296.png",
          "user"
        );
        userSignin(
          "$@FAKE-USER@$",
          "jessica.rotte@mail.com",
          "Rotte",
          "Jessica",
          "Assitante RH",
          "http://localhost:3000/img/14_1626698870723.png",
          "user"
        );
        userSignin(
          "$@FAKE-USER@$",
          "dolly.prane@mail.com",
          "Prane",
          "Dolly",
          "Service Client",
          "http://localhost:3000/img/15_1626698889173.png",
          "user"
        );

        console.log("📋  La création d'articles pour la demo... 📜");
        const newArticle = async (user, title, content, likes, likesNbr) => {
          Article.create({
            AuthorId: user,
            title: title,
            content: content,
            wholike: likes,
            likes: likesNbr,
          });
        };

        setTimeout(() => {
          newArticle(
            16,
            "Plan de relance",
            "Un plan de relance des ventes a été mis en place. Merci à tous.tes pour ce beau travail.",
            "16,2,3,4,5,6,7,8,9,10,11,12,13,14,15",
            15
          );
          newArticle(
            3,
            "Bilan sur la prime",
            "Nous sommes entrain de voir si l'objectif a été atteint pour la prime d'intéressement",
            "16,2,15",
            3
          );
          newArticle(
            6,
            "Nouveau Design",
            "Bientôt un nouveau logo pour la boite !",
            "16,2",
            2
          );
          newArticle(9, 
            "Enfin !", 
            "J'ai un nouveau téléphone !", 
            "2", 
            1
          );
          newArticle(
            10,
            "C'était tendu !",
            "Nous avons décroché le contrat avec GOOGLE ! Incroyable !",
            "16,2,3,4,5",
            5
          );
          newArticle(
            2,
            "Je cherche des équipiers",
            "Qui veut monter une équipe de foot ?",
            "16,2,3,4,5,6",
            6
          );
          newArticle(
            15,
            "Formation pour tous le monde !",
            "Le nouveau logiciel de gestion des heures est déployé, une formation vous sera envoyée par email.",
            "16,2,3,4,5,6,7,8,9,10",
            10
          );
          newArticle(
            14,
            "Place de Parking.",
            "Je cherche une place de parking dans le coin, quelqu'un à un tuyau pour moi ?",
            "",
            0
          );
          newArticle(
            13,
            "Des idées ?",
            "Le CSE cherche des idées qui ferait plaisir pour noël ! Contactez moi si quelque chose vous traverse l'esprit !",
            "16,2,3,4,5,6,7,8,9",
            9
          );
          newArticle(
            12,
            "On boit un coup ?",
            "Qui est chaud pour boire un coup mercredi après le taf ? (ou pendant... ;p)",
            "16,2,3,4",
            4
          );
          newArticle(
            11,
            "On l'a fait !",
            "La mission marketng est une veritable victoire",
            "16,2,3,4,5,6,7,8,9,10,11,12,13,14,15",
            15
          );
          newArticle(
            10,
            "On recrute !",
            "Nous recrutons 2 nouvelles personnes au poste de Dev Web, parlez en à vos connaissances du secteur !",
            "16",
            1
          );
          newArticle(
            9,
            "Besoin d'aide...",
            "Quelqu'un s'y connait en smartphone ? Je trouve plus mes photos",
            "",
            0
          );
          newArticle(
            8,
            "Fermeture annuelle",
            "Cette année nous fermerons du 7 au 21 Aout.",
            "16,2,3,4,5,6,7,8,9,10,11,12",
            12
          );
          newArticle(
            7,
            "Stagiaire de 3eme",
            "Nous avons plein de stagiaires qui postulent. Si quelqu'un veut bien en prendre un faites signe !",
            "11,12,13,14,15",
            5
          );
          newArticle(
            6,
            "Nouveau Logo",
            "N'oubliez pas d'aller voter pour notre nouveau logo ! c'est jusqu'à vendredi !",
            "16,2,3,4,5,13,14,15",
            8
          );
          newArticle(
            5,
            "Je vend ma voiture",
            "Je vends ma voiture, si quelqu'un cherche une clio contactez moi !",
            "16,15",
            2
          );
          newArticle(
            4,
            "Qui à perdu son badge ?",
            "J'ai trouvé un badge pour la photocopieuse ! Je l'ai déposé à l'acceuil.",
            "",
            0
          );
          newArticle(
            3,
            "La prime est là",
            "Les objectifs ont été atteints ! La prime arrive en septembre !",
            "3,14,15",
            3
          );
          newArticle(
            2,
            "Tournois de foot",
            'Les inscriptions pour le "Groupomania tounament" sont ouvertes',
            "16,2",
            2
          );
          newArticle(
            16,
            "Alors ?",
            "On en est où du plan de relance ? Quelqu'un à des news ?",
            "",
            0
          );
        }, 2000);

        const newComment = async (articleID, content, user) => {
          Comment.create({
            AuthorId: user,
            content: content,
            ArticleId: articleID,
          });
        };

        setTimeout(() => {
          newComment("21", "Super !", "2");
          newComment("21", "Cool !", "5");
          newComment("21", "Incroyable !", "6");
          newComment("21", "Nickel", "12");
          newComment("21", "Enorme !", "3");
          newComment("19", "Super !", "15");
          newComment("19", "Enorme !", "7");
          newComment("17", "Super !", "16");
          newComment("17", "Cool !", "2");
          newComment("17", "Nickel", "5");
          newComment("17", "Enorme !", "6");
          newComment("16", "Incroyable !", "8");
          newComment("16", "Nickel", "9");
          newComment("16", "Enorme !", "10");
          newComment("10", "Super !", "16");
          newComment("10", "Cool !", "3");
          newComment("10", "Incroyable !", "4");
          newComment("10", "Nickel", "5");
          newComment("10", "Enorme !", "6");
          newComment("8", "Super !", "7");
          newComment("8", "Super !", "9");
          newComment("8", "Cool !", "11");
          newComment("8", "Incroyable !", "13");
          newComment("8", "Nickel", "15");
          newComment("8", "Enorme !", "2");
        }, 3000);
      }
    });
  }, 1000);
}

//----
