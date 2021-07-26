const Comment = require("../models/Comment");

//----------------------------------------------------------
//--[NEW COMMENT]-------------------------------------------
//----------------------------------------------------------
exports.newComment = (req, res, next) => {
    console.log("📋  La création d'un commentaire est demandé 🎤");
    Comment.create({
        AuthorId: req.body.UserId,
        ArticleId : req.params.id,
        content : req.body.content,
    })
    .then(() => {
        res.status(201).send({ message: "💾 Commentaire enregistré ✔️" });
    })
    .catch((err) => {
        res.status(500).send({
            message:
              err.message ||
              "💥 Impossible d'enregistrer le commentaire 💥",
          });
    })
};

//----------------------------------------------------------
//--[GET COMMENTS BY ARTICLE]-------------------------------
//----------------------------------------------------------
exports.getComments= (req, res) => {
    console.log("📋  Les commentaires d'un article sont demandés 📜");
    Comment.findAll({
      where: { ArticleId: req.params.id },
      order: [["createdAt", "ASC"]]
    })
      .then((data) => {
        if (data == "") {
          res.send({ message: "⚠️ Commentaires inexistants ⚠️" });
        } else {
          res.send(data);
        }
      })
      .catch(() => {
        res.status(500).send({
          message:
            "💥 Erreur interne au serveur 💥 ECHEC RECUPERATION DE L'ARTICLE 💥",
        });
      });
};

//----------------------------------------------------------
//--[MODIFY BY ID]------------------------------------------
//----------------------------------------------------------
exports.modify = (req, res) => {
    console.log("📋  Modification du commentaire n°"+req.params.id+" demandée 📜");
    Comment.findOne({
      where: { id: req.params.id },
    })
      .then((data) => {
        if (data.AuthorId != req.body.UserId) {
          res.send({ message: "⚠️ Vous n'avez pas les droits pour effectuer cette action ⚠️" });
        } else {
            if(req.body.content == ""){
                data.destroy();
                res.send({ message : "Modification effectuée ✔️"});
            }else{
                data.content = req.body.content;
                data.save()
                .then(() => {
                    console.log("✏️  Article modifié ! ✔️");
                    res.send({ message : "Modification effectuée ✔️"});
                })
            }
        }
      })
      .catch(() => {
        res.status(500).send({
          message:
            "💥 Erreur interne au serveur 💥 ECHEC RECUPERATION DES ARTICLES 💥",
        });
      });
  };

//----------------------------------------------------------
//--[DELETE BY ID]------------------------------------------
//----------------------------------------------------------
exports.delete = (req, res) => {
    console.log("📋  Suppression du commentaire n°"+req.params.id+" demandée 📜");
    Comment.findOne({
      where: { id: req.params.id },
    })
      .then((data) => {
        if (data.AuthorId != req.body.UserId) {
          res.send({ message: "⚠️ Vous n'avez pas les droits pour effectuer cette action ⚠️" });
        } else {
            data.destroy();
            res.send({ message : "Modification effectuée ✔️"});
        }
      })
      .catch(() => {
        res.status(500).send({
          message:
            "💥 Erreur interne au serveur 💥 ECHEC RECUPERATION DES ARTICLES 💥",
        });
      });
  };

