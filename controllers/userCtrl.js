const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

//----------------------------------------------------------
//--[SIGNUP]------------------------------------------------
//----------------------------------------------------------
exports.signup = (req, res, next) => {
  console.log("💾 Demande d'inscription ! 📋");

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
      res
        .status(500)
        .send({
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
      res.status(200).send({ message: "💾 Utilisateur enregistré ✔️" });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "💥 Erreur interne au serveur 💥",
      });
    });
};

//----------------------------------------------------------
//--[LOGIN]-------------------------------------------
//----------------------------------------------------------

exports.login = (req, res) => {

    const TOKEN = "gTVX35~MTE#4)Vy"
    //TODO : change & put token in .env before push final version

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
    User.findOne({ where: { email: req.body.email } })
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
              token: jwt.sign({ userId: user.id }, TOKEN, { expiresIn: "24h" }),
            });
          })
          .catch(() =>
            res
              .status(500)
              .send({ message: "💥 Erreur interne au serveur 💥" })
          );
      })
      .catch((error) =>
        res.status(500).send({ message: "💥 Erreur interne au serveur 💥" })
      );
  };