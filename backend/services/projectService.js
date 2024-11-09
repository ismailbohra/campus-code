const Project = require('../models/projects');

exports.createProject = async (projectData) => {
  const project = new Project(projectData);
  return await project.save();
};

exports.getAllProjects = async (req) => {
  const projects = await Project.find();
  return projects.map(project => ({
    ...project.toObject(),
    imageUrl: project.image ? `${req.protocol}://${req.get('host')}/uploads/${project.image}` : null,
  }));
};


exports.deleteProject = async (id) => {
  return await Project.findByIdAndDelete(id);
};
