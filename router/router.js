const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');
const userControllers = require('../controllers/UserControllers');
const validate = require('../validation/validator');
const schemaUser = require('../validation/schema/user.schema');
const auth = require("../auth/auth");
const { client } = require("../data/database");
router.get("/profile", controller.Allprofile);
 // This line now correctly references getOneprofile
router.post("/login", userControllers.login);
router.post("/signup", validate(schemaUser, 'body'), controller.addNewUser);

module.exports = router;
