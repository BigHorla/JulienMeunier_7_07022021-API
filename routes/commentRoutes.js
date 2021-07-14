const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/commentCtrl");
const auth = require("../middleware/auth");

//TODO : restor auth

//POST-POST-POST-POST-POST-POST-POST-POST-POST-POST-POST-
//POST-POST-POST-POST-POST-POST-POST-POST-POST-POST-POST-
//POST-POST-POST-POST-POST-POST-POST-POST-POST-POST-POST-

//new comment
router.post("/new:ArticleId", commentCtrl.newComment);

//GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-
//GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-
//GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-

//get comments by Article ID
router.get("/commentOf:ArticleId", /* auth, */ commentCtrl.getComments);

//PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-
//PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-
//PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-

//modify by id
router.put("/modify:CommentId",/*  auth, */ commentCtrl.modify);

//DELETE-DELETE-DELETE-DELETE-DELETE-DELETE-DELETE-DELETE-
//DELETE-DELETE-DELETE-DELETE-DELETE-DELETE-DELETE-DELETE-
//DELETE-DELETE-DELETE-DELETE-DELETE-DELETE-DELETE-DELETE-

//delete comment by id
router.delete("/delete:CommentId", commentCtrl.delete);

module.exports = router;
