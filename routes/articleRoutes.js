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

//get all articles
router.get("/getAll", auth , articleCtrl.getArticles);
//get some articles
router.get("/getSome/:batch", auth , articleCtrl.getSomeArticles);
//get articles by author
router.get("/byAuthor/:id", auth , articleCtrl.getArticlesByAuthor);
//Get if user likes the article
router.get("/whoLikeIt/:id", auth , articleCtrl.whoLikeIt);

//PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-
//PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-
//PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-

//put or remove a like
router.put("/like/:id", auth , articleCtrl.like);


//DELETE-DELETE-DELETE-DELETE-DELETE-DELETE-DELETE-DELETE-
//DELETE-DELETE-DELETE-DELETE-DELETE-DELETE-DELETE-DELETE-
//DELETE-DELETE-DELETE-DELETE-DELETE-DELETE-DELETE-DELETE-

//delete article
router.delete("/delete/:id", auth , articleCtrl.delete);

//-----------------------
module.exports = router;