const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');
const userControllers = require('../controllers/UserControllers');
const validate = require('../validation/validator');
const schemaUser = require('../validation/schema/user.schema');
const auth = require("../auth/auth");
const { client } = require("../data/database");

router.get("/user/:id", controller.OneProfile);
 // This line now correctly references getOneprofile
router.post("/login", userControllers.login);
router.post("/signup", validate(schemaUser, 'body'), controller.addNewUser);
router.post("/tasks", controller.createTask);
router.get("/tasks/:userId", controller.getTasks);
router.delete("/tasks/:taskId", controller.deleteTask);
router.put("/tasks/:taskId", controller.updateTask);
module.exports = router;
