const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const fs = require("file-system");

require("dotenv").config();
const TOKEN = process.env.TOKEN;

const debugOn = false;

const debug = (text) => {
  if(debugOn){
    console.log(text);
  }
}

//----------------------------------------------------------
//--[SIGNUP]------------------------------------------------
//----------------------------------------------------------
exports.signup = (req, res, next) => {
  debug("💾 Demande d'inscription ! 📋");

  //Request checking
  if (!req.body.lastName) {
    res.status(404).send({
      message: "⚠️ Veuillez renseigner un nom ⚠️",
    });
  }
  if (!req.body.firstName) {
    res.status(404).send({
      message: "⚠️ Veuillez renseigner un prenom ⚠️",
    });
  }
  if (!req.body.email) {
    res.status(404).send({
      message: "⚠️ Veuillez renseigner une adresse email ⚠️",
    });
  }
  if (!req.body.password) {
    res.status(404).send({
      message: "⚠️ Veuillez renseigner un mot de passe ⚠️",
    });
  }

  User.findOne({ where: { email: req.body.email } }).then((email) => {
    if (email) {
      res.status(500).send({
        message: "⚠️ Cette adresse mail est déjà liée à un compte ⚠️",
      });
    }
  });

  //Registration
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      User.create({
        password: hash,
        email: req.body.email,
        lastName: req.body.lastName,
        firstName: req.body.firstName,
        job: req.body.job,
      });
    })
    .then(() => {
      res.status(201).send({ message: "💾 Utilisateur enregistré ✔️" });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "💥 Erreur interne au serveur 💥 ECHEC ENCRYPTAGE MOT DE PASSE 💥",
      });
    });
};

//----------------------------------------------------------
//--[LOGIN]-------------------------------------------------
//----------------------------------------------------------

exports.login = (req, res) => {
  //Request checking
  if (!req.body.email) {
    res.status(404).send({
      message: "⚠️ Veuillez renseigner une adresse email 📧",
    });
  }
  if (!req.body.password) {
    res.status(404).send({
      message: "⚠️ Veuillez renseigner un mot de passe 🔑",
    });
  }
  User.findOne({
    where: { email: req.body.email },
  })
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: "⚠️ Utilisateur inexistant 🔎" });
      }

      //login
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            res.status(404).send({ message: "⚠️ Mot de passe incorrect 🔒" });
          }
          res.status(200).send({
            userId: user.id,
            token: jwt.sign({ userId: user.id, userRole : user.roles }, TOKEN, { expiresIn: "24h" }),
          });
        })
        .catch(() =>
          res.status(500).send({
            message:
              "💥 Erreur interne au serveur 💥 ECHEC VERIFICATION MOT DE PASSE 💥",
          })
        );
    })
    .catch((error) =>
      res.status(500).send({
        message:
          "💥 Erreur interne au serveur 💥 ECHEC RECUPERATION DE L'UTILISATEUR 💥",
      })
    );
};

//----------------------------------------------------------
//--[GET USERS]---------------------------------------------
//----------------------------------------------------------

exports.getUsers = (req, res) => {
  debug("📋  Liste des utilisateurs demandée 👨‍👩‍👧‍👦 ");
  User.findAll({
    order: [["lastName", "ASC"]],
  })
    .then((data) => {
      res.send(data);
    })
    .catch(() => {
      res.status(500).send({
        message:
          "💥 Erreur interne au serveur 💥 ECHEC RECUPERATION DES UTILISATEURS 💥",
      });
    });
};

//----------------------------------------------------------
//--[GET USER BY ID]----------------------------------------
//----------------------------------------------------------

exports.getUserByID = (req, res) => {
  debug("📋   Utilisateur n°"+req.params.id+" demandé 🧑 ");
  User.findOne({
    where: { id: req.params.id },
    attributes: { exclude: ["password"] }, //don't pass the password unnecessarily
  })
    .then((data) => {
      if (!data) {
        res.send({ message: "⚠️ Utilisateur inexistant ⚠️" });
      } else {
        res.send(data);
      }
    })
    .catch(() => {
      res.status(500).send({
        message:
          "💥 Erreur interne au serveur 💥 ECHEC RECUPERATION DE L'UTILISATEUR 💥",
      });
    });
};

//----------------------------------------------------------
//--[MODIFY USER BY ID]-------------------------------------
//----------------------------------------------------------

exports.modify = (req, res) => {

  debug("📋  Modification de l'utilisateur n°"+req.params.id+" demandée 📜");
  User.findOne({
    where: { id: req.params.id },
    attributes: { exclude: ["password"] }, //don't pass the password unnecessarily
  })
    .then((data) => {
      if (data.id != req.body.UserId) {
        res.send({ message: "⚠️ Vous n'avez pas les droits pour effectuer cette action ⚠️" });
      } else {

        data.email = req.body.email;
        data.lastName = req.body.lastName;
        data.firstName = req.body.firstName;
        data.job = req.body.job;
        data.bio = req.body.bio;
        data.birthday = req.body.birthday;
         
        data.save()
          .then(debug("✏️  Utilisateur modifié ! ✔️"))
        res.send(data);
      }
    })
    .catch(() => {
      res.status(500).send({
        message:
          "💥 Erreur interne au serveur 💥 ECHEC RECUPERATION DES INFOS UTILISATEUR 💥",
      });
    });
};

//----------------------------------------------------------
//--[MODIFY USER's PIC BY ID]-------------------------------
//----------------------------------------------------------
exports.picture = (req, res) => {
  console.log(req.params.id);
  debug("📋  Modification de l'utilisateur n°"+req.params.id+" demandée 📜");
  User.findOne({
    where: { id: req.params.id },
    attributes: { exclude: ["password"] }, //don't pass the password unnecessarily
  })
    .then((data) => {
      const oldImg = './img/'+data.profileImage.split('/img/')[1];
      console.log(oldImg);
      data.profileImage = req.protocol+"://"+req.get('host')+"/img/"+req.file.filename   
      data.save()
      .then(debug("✏️  Image Utilisateur modifié ! ✔️"))
      .catch((err) => console.log(err))
      res.send(data);     
      fs.unlinkSync(oldImg)
    })
    .catch(() => {
      res.status(500).send({
        message:
          "💥 Erreur interne au serveur 💥 ECHEC RECUPERATION DES INFOS UTILISATEUR 💥",
      }); 
    });
};

//----------------------------------------------
//--[ADMIN POWER]-------------------------------
//----------------------------------------------
exports.admin = (req, res) => {
  console.log(req.params.id);
  debug("📋  Modification de l'utilisateur n°"+req.params.id+" demandée 📜");
  User.findOne({
    where: { id: req.params.id },
    attributes: { exclude: ["password"] }, //don't pass the password unnecessarily
  })
    .then((data) => {
      data.roles != "admin" ? newRole = "admin" : newRole = "user"
      data.roles = newRole   
      data.save()
      .then(debug("✏️  Image Utilisateur modifié ! ✔️"))
      .catch((err) => console.log(err))
      res.send(data);
    })
    .catch(() => {
      res.status(500).send({
        message:
          "💥 Erreur interne au serveur 💥 ECHEC RECUPERATION DES INFOS UTILISATEUR 💥",
      }); 
    });
};
