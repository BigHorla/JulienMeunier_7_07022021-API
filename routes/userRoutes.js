const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/userCtrl");
const auth = require("../middleware/auth");

//Signup
router.post("/signup", userCtrl.signup);

//Login
router.post("/login", userCtrl.login);

//get all users
router.get("/getusers", auth, userCtrl.getUsers);

//get user by id
router.post("/getUserByID:id", auth, userCtrl.getUserByID);

module.exports = router;
