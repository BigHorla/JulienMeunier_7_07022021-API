const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/commentCtrl");
const auth = require("../middleware/auth");

//POST-POST-POST-POST-POST-POST-POST-POST-POST-POST-POST-
//POST-POST-POST-POST-POST-POST-POST-POST-POST-POST-POST-
//POST-POST-POST-POST-POST-POST-POST-POST-POST-POST-POST-

//new comment
router.post("/new/:ArticleId", auth , commentCtrl.newComment);

//GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-
//GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-
//GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-

//get comments by Article ID
router.get("/commentOf/:ArticleId", auth , commentCtrl.getComments);

//DELETE-DELETE-DELETE-DELETE-DELETE-DELETE-DELETE-DELETE-
//DELETE-DELETE-DELETE-DELETE-DELETE-DELETE-DELETE-DELETE-
//DELETE-DELETE-DELETE-DELETE-DELETE-DELETE-DELETE-DELETE-

//delete comment by id
router.delete("/delete/:id", auth , commentCtrl.delete);

module.exports = router;
