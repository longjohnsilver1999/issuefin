const Project = require("../models/project");
exports.showProjectForm = (req, res) => {
  res.render("createProject.ejs");
};

exports.createProject = async (req, res) => {
  try {
    const { projectname, author, description } = req.body;
    const project = new Project({ projectname, author, description });
    await project.save();
    res.status(201).json({ message: "Project created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Unable to create project" });
  }
};

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({});
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: "Unable to retrieve projects" });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);
    if (!project) {
      res.status(404).json({ error: "Project not found" });
    } else {
      res.status(200).json(project);
    }
  } catch (error) {
    res.status(500).json({ error: "Unable to retrieve project" });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { projectname, author, description } = req.body;
    const project = await Project.findByIdAndUpdate(id, {
      projectname,
      author,
      description,
    });
    if (!project) {
      res.status(404).json({ error: "Project not found" });
    } else {
      res.status(200).json({ message: "Project updated successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: "Unable to update project" });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndDelete(id);
    if (!project) {
      res.status(404).json({ error: "Project not found" });
    } else {
      res.status(200).json({ message: "Project deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: "Unable to delete project" });
  }
};
