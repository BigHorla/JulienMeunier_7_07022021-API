const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/commentCtrl");
const auth = require("../middleware/auth");

//TODO : restor auth

//POST-POST-POST-POST-POST-POST-POST-POST-POST-POST-POST-
//POST-POST-POST-POST-POST-POST-POST-POST-POST-POST-POST-
//POST-POST-POST-POST-POST-POST-POST-POST-POST-POST-POST-

//new comment
router.post("/new/:id", commentCtrl.newComment);

//GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-
//GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-
//GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-

//get comments by Article ID
router.get("/commentOf/:id", /* auth, */ commentCtrl.getComments);

//PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-
//PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-
//PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-

//modify by id
router.put("/modify/:id",/*  auth, */ commentCtrl.modify);

//DELETE-DELETE-DELETE-DELETE-DELETE-DELETE-DELETE-DELETE-
//DELETE-DELETE-DELETE-DELETE-DELETE-DELETE-DELETE-DELETE-
//DELETE-DELETE-DELETE-DELETE-DELETE-DELETE-DELETE-DELETE-

//delete comment by id //TODO : POST
router.post("/delete/:id", commentCtrl.delete);

module.exports = router;
