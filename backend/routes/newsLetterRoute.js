const express = require('express');
const router = express.Router();
const newsletterController = require('../controllers/newsLetterController');
const validate = require('../middelwares/validate');
const { subscribeNewsletterValidation } = require('../validations/newsLetterValidation');

/**
 * @swagger
 * /newsletter/subscribe:
 *   post:
 *     tags:
 *       - Newsletter
 *     summary: Subscribe to the newsletter
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Successfully subscribed to the newsletter
 *       400:
 *         description: Email is required
 *       500:
 *         description: Internal server error
 */
router.post('/subscribe', validate(subscribeNewsletterValidation), newsletterController.subscribe);

/**
 * @swagger
 * /newsletter:
 *   get:
 *     tags:
 *       - Newsletter
 *     summary: Get all newsletter subscribers
 *     responses:
 *       200:
 *         description: List of all subscribers
 *       500:
 *         description: Internal server error
 */
router.get('/', newsletterController.getAllSubscribers);

/**
 * @swagger
 * /newsletter/{email}:
 *   delete:
 *     tags:
 *       - Newsletter
 *     summary: Delete a subscriber by email
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Subscriber deleted successfully
 *       404:
 *         description: Subscriber not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', newsletterController.deleteSubscriber);

module.exports = router;
