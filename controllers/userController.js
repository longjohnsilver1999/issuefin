const User = require("../models/userModel");
const Project = require("../models/projectModel");
const Issue = require("../models/issueModel");
const session = require("express-session");
const mongoose = require("mongoose");
exports.showRegisterForm = (req, res) => {
  res.render("register");
};

exports.registerUser = async (req, res) => {
  try {
    const { username, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      res.render("register", { error: "Passwords do not match" });
    } else {
      const user = new User({ username, password });
      await user.save();
      res.redirect("/login");
    }
  } catch (error) {
    res.status(500).json({ error: "Unable to register user" });
  }
};

exports.showLoginForm = (req, res) => {
  res.render("login");
};

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      res.render("login", { error: "User not found" });
    } else if (user.password !== password) {
      res.render("login", { error: "Incorrect password" });
    } else {
      // Successful login
      const projects = await Project.find({ user: user._id });
      res.render("dashboard", { user, projects });
      //res.redirect(`/dashboard`);
    }
  } catch (error) {
    res.status(500).json({ error: "Unable to login" });
  }
};

exports.showDashboard = async (req, res) => {
  const { username } = req.query;
  req.session.userId = req.user._id;
  console.log("Username:", username);

  try {
    const user = await User.findOne({ username: username });

    console.log("User:", user);

    if (!user) {
      console.error("User not found");
      res.render("login", { error: "User not found" });
    }

    const projects = await Project.find({ user: user._id });
    console.log(projects);
    if (projects) {
      console.log(projects);
      res.render("dashboard", { user, projects });
    } else {
      res.render("dashboard", { user, error: "No projects added yet" });
    }
  } catch (err) {
    console.error("Error finding user or projects:", err);
    return res.status(500).send("Internal Server Error");
  }
};

exports.showCreateProjectForm = async (req, res) => {
  const userId = req.query.userId;
  res.render("createProject.ejs", { userId });
};
exports.createProject = async (req, res) => {
  const { projectname, author, description, userId } = req.body;

  // Validate if projectname is provided
  if (!projectname) {
    console.error("Projectname is required");
    return res.redirect("back");
  }

  // Validate if userId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    console.error("Invalid userId");
    return res.redirect("back");
  }

  try {
    const project = await Project.create({
      projectname,
      author,
      description,
      user: userId,
    });

    console.log("Project created:", project);
    // Fetch the user's projects again
    const projects = await Project.find({ user: userId });
    const usert = await User.findOne({ _id: userId });
    // Render the updated dashboard template with the projects
    res.render("dashboard", { user: usert, projects });
  } catch (err) {
    console.error("Error creating project:", err);
    res.redirect("back");
  }
};

exports.showIssues = async (req, res) => {
  const projectId = req.query.projectId;
  console.log(projectId);
  try {
    const project = await Project.findById(projectId);

    console.log("Project:", project);

    if (!project) {
      console.error("Project not found");
      res.render("dashboard", { error: "User not found" });
    }

    const issues = await Issue.find({ project: project._id });
    console.log(issues);
    if (issues) {
      console.log(issues);
      res.render("issues", { project, issues });
    } else {
      res.render("issues", { project, error: "No issues added yet" });
    }
  } catch (err) {
    console.error("Error finding project or issue:", err);
    return res.status(500).send("Internal Server Error");
  }
};

exports.showCreateIssueForm = async (req, res) => {
  const projectId = req.query.projectId;
  res.render("createIssue.ejs", { projectId });
};
// exports.createProject = async (req, res) => {
//   const { projectname, author, description, userId } = req.body;

//   try {
//     const project = await Project.create({
//       projectname,
//       author,
//       description,
//       user: userId,
//     });

//     console.log("Project created:", project);

//     res.redirect("dashboard");
//   } catch (err) {
//     console.error("Error creating project:", err);
//     res.redirect("dashboard");
//   }
// };
exports.createIssue = async (req, res) => {
  const { issuename, author, description, status, type, projectId } = req.body;

  // Validate if projectname is provided
  if (!issuename) {
    console.error("issuename is required");
    return res.redirect("back");
  }

  // Validate if userId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    console.error("Invalid projectId");
    return res.redirect("back");
  }

  try {
    const issue = await Issue.create({
      issuename,
      author,
      description,
      status,
      type,
      project: projectId,
    });

    console.log("Issue created:", issue);
    // Fetch the user's projects again
    const issues = await Issue.find({ project: projectId });
    const projectt = await Project.findOne({ _id: projectId });
    // Render the updated dashboard template with the projects
    res.render("issues", { project: projectt, issues });
  } catch (err) {
    console.error("Error creating project:", err);
    res.redirect("back");
  }
};
