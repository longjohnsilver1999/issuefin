const User = require("../models/userModel");
const Project = require("../models/projectModel");
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
      res.render("dashboard", { user });
      //res.redirect(`/dashboard`);
    }
  } catch (error) {
    res.status(500).json({ error: "Unable to login" });
  }
};

exports.showDashboard = async (req, res) => {
  const { username } = req.query;

  console.log("Username:", username);

  try {
    const user = await User.findOne({ username });

    console.log("User:", user);

    if (!user) {
      console.error("User not found");
      res.render("login", { error: "User not found" });
    }

    const projects = await Project.findOne({ user: user._id });
    console.log(projects);
    if (projects) {
      res.render("dashboard", { user, projects });
    } else {
      res.render("dashboard", { user, error: "no projects added yet" });
    }
  } catch (err) {
    console.error("Error finding user or projects:", err);
    return res.status(500).send("Internal Server Error");
  }
};
