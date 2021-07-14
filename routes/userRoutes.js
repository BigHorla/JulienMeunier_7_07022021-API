const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/userCtrl");
const auth = require("../middleware/auth");

//TODO : restor auth
//TODO : Maybe a delete users fonction ?

//POST-POST-POST-POST-POST-POST-POST-POST-POST-POST-POST-
//POST-POST-POST-POST-POST-POST-POST-POST-POST-POST-POST-
//POST-POST-POST-POST-POST-POST-POST-POST-POST-POST-POST-

//Signup
router.post("/signup", userCtrl.signup);
//Login
router.post("/login", userCtrl.login);
//get user by id
router.post("/getUserByID:id",/*  auth, */ userCtrl.getUserByID);


//GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-
//GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-
//GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-

//get all users
router.get("/getusers", /* auth, */ userCtrl.getUsers);


//PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-
//PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-
//PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-

//modify by id
router.put("/modify:UserId",/*  auth, */ userCtrl.modify);

module.exports = router;
