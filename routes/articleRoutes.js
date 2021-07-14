const express = require("express");
const router = express.Router();
const articleCtrl = require("../controllers/articleCtrl");
const auth = require("../middleware/auth");

//TODO : Add 'auth' after testing

//POST-POST-POST-POST-POST-POST-POST-POST-POST-POST-POST-
//POST-POST-POST-POST-POST-POST-POST-POST-POST-POST-POST-
//POST-POST-POST-POST-POST-POST-POST-POST-POST-POST-POST-

//new article
router.post("/new", articleCtrl.newArticle);


//GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-
//GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-
//GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-

//get article
router.get("/articleID:id", articleCtrl.getArticleByID);
//get all articles
router.get("/getAll", articleCtrl.getArticles);
//get articles by author
router.get("/byAuthor:AuthorId", articleCtrl.getArticlesByAuthor);
//Get if user likes the article
router.get("/whoLikeIt:ArticleId", articleCtrl.whoLikeIt);
//Get likes by Article ID
router.get("/count:ArticleId", articleCtrl.count)


//PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-
//PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-
//PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-

//modify article
router.put("/modify:ArticleId", articleCtrl.modify);
//put or remove a like
router.put("/like:ArticleId", articleCtrl.like);


//DELETE-DELETE-DELETE-DELETE-DELETE-DELETE-DELETE-DELETE-
//DELETE-DELETE-DELETE-DELETE-DELETE-DELETE-DELETE-DELETE-
//DELETE-DELETE-DELETE-DELETE-DELETE-DELETE-DELETE-DELETE-

//delete article
router.delete("/delete:ArticleId", articleCtrl.delete);

//-----------------------
module.exports = router;