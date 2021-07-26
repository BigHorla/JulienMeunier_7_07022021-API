const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/userCtrl");
const auth = require("../middleware/auth");
const uploadProfilPic = require("../middleware/profilPic")

//TODO : restor auth
//TODO : Maybe a delete users fonction ?

//POST-POST-POST-POST-POST-POST-POST-POST-POST-POST-POST-
//POST-POST-POST-POST-POST-POST-POST-POST-POST-POST-POST-
//POST-POST-POST-POST-POST-POST-POST-POST-POST-POST-POST-

//Signup
router.post("/signup", userCtrl.signup);
//Login
router.post("/login", userCtrl.login);


//GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-
//GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-
//GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-GET-

//get all users
router.get("/getusers", /* auth, */ userCtrl.getUsers);
//get user by id
router.get("/getUserByID/:id", /* auth, */ userCtrl.getUserByID);


//PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-
//PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-
//PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-

//modify by id
router.put("/modify/:id", /* auth, */ userCtrl.modify);
//Modify picture
router.put("/picture/:id",  /* auth, */ uploadProfilPic.single('image'), userCtrl.picture)
//Give or resume admin power
router.put("/admin/:id",  /* auth, */ userCtrl.admin)

module.exports = router;

