const Article = require("../models/Article");
const fs = require("file-system")

//----------------------------------------------------------
//--[NEW ARTICLE]-------------------------------------------
//----------------------------------------------------------
exports.newArticle = (req, res, next) => {
    console.log("📋  La création d'un article est demandé 📜");
    
    Article.create({
        AuthorId: req.body.UserId,
        title : req.body.title,
        content : req.body.content,
        attachment : req.file ? req.protocol+"://"+req.get('host')+"/img/"+req.file.filename : null
    })
    .then(() => {
        res.status(201).send({ message: "💾 Article enregistré ✔️" });
    })
    .catch((err) => {
        res.status(500).send({
            message:
              err.message ||
              "💥 Impossible d'enregistrer l'article 💥",
          });
    })
};

//----------------------------------------------------------
//--[GET ONE BY ID]-----------------------------------------
//----------------------------------------------------------
exports.getArticleByID = (req, res) => {
    console.log("📋  Un article est demandé 📜");
    Article.findOne({
      where: { id: req.params.ArticleId },
    })
      .then((data) => {
        if (!data) {
          res.send({ message: "⚠️ Article inexistant ⚠️" });
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
//--[GET ALL ARTCILES]--------------------------------------
//----------------------------------------------------------

exports.getArticles = (req,res, next) => {
    console.log("📋  Liste des articles demandée 📜");
  Article.findAll({
    order: [["createdAt", "DESC"]],
  })
    .then((data) => {
      res.send(data);
    })
    .then(console.log("📡 📜  Liste envoyée ✔️"))
    .catch(() => {
      res.status(500).send({
        message:
          "💥 Erreur interne au serveur 💥 ECHEC RECUPERATION DES ARTICLES 💥",
      });
    });
}

//----------------------------------------------------------
//--[GET ALL BY AUTHOR]-------------------------------------
//----------------------------------------------------------
exports.getArticlesByAuthor = (req, res) => {
    console.log("📋  Liste des articles de l'utilisateur n°"+req.params.id+" demandée 📜");
    Article.findAll({
      where: { AuthorId: req.params.id }
    })
      .then((data) => {
        if (!data) {
          res.send({ message: "⚠️ Article(s) inexistant(s) ⚠️" });
        } else {
          res.send(data);
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
//--[WHO LIKE IT]-------------------------------------------
//----------------------------------------------------------
exports.whoLikeIt = (req, res) => {
  console.log("📋  Nombre de like de l'article n°"+req.params.id+" demandé 📜");
  Article.findOne({
    where: { id: req.params.id },
  })
    .then((data) => {      
      res.send({ userWhoLikeIt : data.wholike.split(",") });
    })
    .catch(() => {
      res.status(500).send({
        message:
          "💥 Erreur interne au serveur 💥 ECHEC RECUPERATION DES ARTICLES 💥",
      });
    });
};

//----------------------------------------------------------
//--[COUNT OF LIKES]-------------------------------------------
//----------------------------------------------------------
exports.count = (req, res) => {
  console.log("📋  Liste des utilisateurs aimant l'article n°"+req.params.ArticleId+" demandée 📜");
  Article.findOne({
    where: { id: req.params.ArticleId },
  })
    .then((data) => {
      res.send({ likes : data.likes})
    })
    .catch(() => {
      res.status(500).send({
        message:
          "💥 Erreur interne au serveur 💥 ECHEC RECUPERATION DES ARTICLES 💥",
      });
    });
};

//----------------------------------------------------------
//--[MODIFY BY ID]------------------------------------------
//----------------------------------------------------------
exports.modify = (req, res) => {
    console.log("📋  Modification de l'articles n°"+req.params.id+" demandée 📜");
    Article.findOne({
      where: { id: req.params.ArticleId },
    })
      .then((data) => {
        if (data.AuthorId != req.body.UserId) {
          res.send({ message: "⚠️ Vous n'avez pas les droits pour effectuer cette action ⚠️" });
        } else {
            data.title = req.body.title;
            data.content = req.body.content;
            data.attachment = req.body.attachment;
            data.save()
            .then(console.log("✏️  Article n°"+req.params.id+" modifié ! ✔️"))
          res.send(data);
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
//--[PUT/REMOVE A LIKE BY ARTICLE ID]-----------------------
//----------------------------------------------------------
exports.like = (req, res) => {
  console.log("📋  Like de l'articles n°"+req.params.id+" demandée 📜  par l'utilisateur n°"+req.body.UserId);
  Article.findOne({
    where: { id: req.params.id },
  })
    .then((data) => {
      users_who_like = data.wholike;

      // there already are likes ?

      if(users_who_like == null || users_who_like == ""){//if not, let's add it
        data.wholike = req.body.UserId;
        data.likes += 1;
        res.send({ message: "📜  Article "+req.params.id+" liké ! 👍" });
        console.log("📜  Article "+req.params.id+" liké ! 👍")
        
      }else{//If yes...
        users_who_like = users_who_like.split(",");
        console.log(users_who_like);
        
        //User already like it ?
        
        if(users_who_like.indexOf(req.body.UserId) != -1){//if not, let's add it
          users_who_like.splice(users_who_like.indexOf(req.body.UserId),1);
          if(users_who_like == []){
            users_who_like = null;
          }
          res.send({ message: "📜  Article "+req.params.id+" disliké ! 👎" });
          console.log("📜  Article "+req.params.id+" disliké ! 👎")

        }else{//if yes, let's remove it  
          users_who_like.push(req.body.UserId);
          res.send({ message: "📜  Article "+req.params.id+" liké ! 👍" });
          console.log("📜  Article "+req.params.id+" liké ! 👍")        
        }

        data.likes = users_who_like.length;
        data.wholike = users_who_like.toString();
        
      }

      data.save()//Saving changes
         
    })
    .catch(() => {
      res.status(500).send({
        message:
          "💥 Erreur interne au serveur 💥 ECHEC RECUPERATION DE L'ARTICLES 💥",
      });
    });
};

//----------------------------------------------------------
//--[DELETE BY ID]------------------------------------------
//----------------------------------------------------------

exports.delete = (req, res, next) => {
    console.log("📋  Suppression de l'articles n°"+req.params.id+" demandée 📜");
    Article.findOne({
        where: { id: req.params.id },
      })
      .then((data) => {
        console.log(data.AuthorId)
        console.log(req.body)
        if (data.AuthorId != req.body.UserId) {
          res.send({ message: "⚠️ Vous n'avez pas les droits pour effectuer cette action ⚠️" });
        } else {
          if(data.attachment){
            const oldImg = './img/'+data.attachment.split('/img/')[1];
            fs.unlinkSync(oldImg);
            data.destroy()
            .then(console.log("💣  Article supprimé ! ✔️"))
            res.send({ message: "💣  Article supprimé ! ✔️"});
          }else{
            data.destroy()
            .then(console.log("💣  Article supprimé ! ✔️"))
            res.send({ message: "💣  Article supprimé ! ✔️"});
          }            
        }
      })
      .catch(() => {
        res.status(500).send({
          message:
            "💥 Erreur interne au serveur 💥 ECHEC RECUPERATION DE L'ARTICLE 💥",
        });
      });
};