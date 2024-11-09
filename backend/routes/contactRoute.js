const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const validate = require('../middelwares/validate');
const { contactFormValidation } = require('../validations/contactFormValidation');

/**
 * @swagger
 * /contact:
 *   post:
 *     tags: 
 *       - contact
 *     summary: Create a new contact
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *               email:
 *                 type: string
 *               mobile:
 *                 type: number
 *               city:
 *                 type: string
 *     responses:
 *       201:
 *         description: Contact created successfully
 */
router.post('/',validate(contactFormValidation), contactController.createContact);

/**
 * @swagger
 * /contact:
 *   get:
 *     tags: 
 *       - contact
 *     summary: Get all contacts
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: List of all contacts
 */
router.get('/', contactController.getContacts);

/**
 * @swagger
 * /contact/{id}:
 *   delete:
 *     tags: 
 *       - contact
 *     summary: Delete a contact by ID
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
 *         description: Contact deleted successfully
 *       404:
 *         description: Contact not found
 */
router.delete('/:id', contactController.deleteContact);

module.exports = router;
