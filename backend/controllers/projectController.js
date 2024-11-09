const projectService = require('../services/projectService');

exports.createProject = async (req, res) => {
  try {
    const projectData = {
      ...req.body,
      image: req.file ? req.file.filename : null,
    };

    const project = await projectService.createProject(projectData);
    res.status(201).json({ message: 'Project created successfully', data: project });
  } catch (error) {
    res.status(500).json({ message: 'Error creating project', error: error.message });
  }
};

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await projectService.getAllProjects(req);
    res.status(200).json({ message: 'Projects retrieved successfully', data: projects });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving projects', error: error.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const project = await projectService.deleteProject(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting project', error: error.message });
  }
};
