const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
router.get("/", userController.showRegisterForm);
router.post("/", userController.showRegisterForm);
router.get("/register", userController.showRegisterForm);
router.post("/register", userController.registerUser);
router.get("/login", userController.showLoginForm);
router.post("/login", userController.loginUser);
router.get("/dashboard", userController.showDashboard);
router.get("/projects/create", userController.showCreateProjectForm);
router.post("/projects/create", userController.createProject);

module.exports = router;
