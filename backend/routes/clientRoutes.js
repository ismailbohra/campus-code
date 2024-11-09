// routes/clientRoutes.js

const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const upload = require('../middelwares/uploadMiddelware');

/**
 * @swagger
 * /client:
 *   post:
 *     tags:
 *         - Client
 *     summary: Create a new client
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
 *               designation:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Client created successfully
 */
router.post('/', upload.single('image'), clientController.createClient);


/**
 * @swagger
 * /client:
 *   get:
 *     tags:
 *       - Client
 *     summary: Get all clients
 *     responses:
 *       200:
 *         description: List of all clients
 */
router.get('/', clientController.getAllClients);

/**
 * @swagger
 * /client/{id}:
 *   delete:
 *     tags:
 *        - Client
 *     summary: Delete a client by ID
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
 *         description: Client deleted successfully
 *       404:
 *         description: Client not found
 */
router.delete('/:id', clientController.deleteClient);

module.exports = router;
