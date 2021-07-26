const express = require("express");
const router = express.Router();
const articleCtrl = require("../controllers/articleCtrl");
const auth = require("../middleware/auth");
const uploadArticlePic = require("../middleware/articlePic")

//TODO : Add 'auth' after testing

//POST-POST-POST-POST-POST-POST-POST-POST-POST-POST-POST-
//POST-POST-POST-POST-POST-POST-POST-POST-POST-POST-POST-
//POST-POST-POST-POST-POST-POST-POST-POST-POST-POST-POST-

//new article
router.post("/new", uploadArticlePic.single('image'), articleCtrl.newArticle);


//GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-
//GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-
//GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-

//get article
router.get("/ArticleId:id", articleCtrl.getArticleByID);
//get all articles
router.get("/getAll", articleCtrl.getArticles);
//get articles by author
router.get("/byAuthor/:id", articleCtrl.getArticlesByAuthor);
//Get if user likes the article
router.get("/whoLikeIt/:id", articleCtrl.whoLikeIt);
//Get likes by Article ID
router.get("/count:ArticleId", articleCtrl.count)


//PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-
//PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-
//PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-

//modify article
router.put("/modify:ArticleId", articleCtrl.modify);
//put or remove a like
router.put("/like/:id", articleCtrl.like);


//DELETE-DELETE-DELETE-DELETE-DELETE-DELETE-DELETE-DELETE-
//DELETE-DELETE-DELETE-DELETE-DELETE-DELETE-DELETE-DELETE-
//DELETE-DELETE-DELETE-DELETE-DELETE-DELETE-DELETE-DELETE-

//delete article
router.post("/delete/:id", articleCtrl.delete);

//-----------------------
module.exports = router;