const express = require("express");
const router = express.Router();

const ProjectController = require("../controllers/projectController");
const userController = require("../controllers/userController");

router.get("/projects/create", userController.showCreateProjectForm);
router.post("/projects/create", userController.createProject);
// router.get("/projects/create", userController.showCreateProjectForm);
// router.post("/projects/create", userController.createProject);

// router.get("/projects/:id", ProjectController.getProjectById);
// router.get("/projects/:id/edit", userController.showEditProjectForm);
// router.post("/projects/:id/edit", userController.updateProject);
// router.post("/projects/:id/delete", userController.deleteProject);

module.exports = router;
