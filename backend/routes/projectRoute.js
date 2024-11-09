const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const upload = require('../middelwares/uploadMiddelware');

/**
 * @swagger
 * /project:
 *   post:
 *     tags:
 *       - project
 *     summary: Create a new project
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Project created successfully
 */
router.post('/', upload.single('image'), projectController.createProject);


/**
 * @swagger
 * /project:
 *   get:
 *     tags:
 *      - project
 *     summary: Get all projects
 *     responses:
 *       200:
 *         description: List of all projects
 */
router.get('/', projectController.getAllProjects);

/**
 * @swagger
 * /project/{id}:
 *   delete:
 *     tags:
 *      - project
 *     summary: Delete a project by ID
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Project deleted successfully
 *       404:
 *         description: Project not found
 */
router.delete('/:id', projectController.deleteProject);

module.exports = router;
