const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/userCtrl");
const auth = require("../middleware/auth");
const uploadProfilPic = require("../middleware/profilPic")

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
router.get("/getusers", auth, userCtrl.getUsers);
//get user by id
router.get("/getUserByID/:id", auth, userCtrl.getUserByID);


//PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-
//PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-
//PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-PUT-

//modify by id
router.put("/modify/:id", auth, userCtrl.modify);
//Modify picture
router.put("/picture/:id",  auth, uploadProfilPic.single('image'), userCtrl.picture);
//Give or resume admin power
router.put("/admin/:id",  auth, userCtrl.admin);
//Modify password
router.put("/password/:id",  auth, userCtrl.password);


//DELETE-DELETE-DELETE-DELETE-DELETE-DELETE-DELETE-DELETE-
//DELETE-DELETE-DELETE-DELETE-DELETE-DELETE-DELETE-DELETE-
//DELETE-DELETE-DELETE-DELETE-DELETE-DELETE-DELETE-DELETE-

//Delete user
router.delete("/delete/:id", auth, userCtrl.delete)

module.exports = router;

