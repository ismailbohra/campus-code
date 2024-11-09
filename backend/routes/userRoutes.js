const express = require('express');
const router = express.Router();
const validate = require('../middelwares/validate');
const userController = require('../controllers/userController');
const userValidation = require('../validations/userValidation');
const { verifyToken } = require('../middelwares/Jwt');
const limiter = require('../middelwares/rateLimiter');

/**
 * @swagger
 * /user/getUserById/{userId}:
 *   get:
 *     tags: 
 *       - User
 *     summary: Get user by ID
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: User information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 profile_picture:
 *                   type: string
 */
router.route('/getUserById/:userId').get(verifyToken, validate(userValidation.getUser), userController.getUser);

/**
 * @swagger
 * /user/login:
 *   post:
 *     tags: 
 *       - User
 *     summary: Login with email and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for authentication
 */
router.route('/login').post(limiter, validate(userValidation.login), userController.login);

/**
 * @swagger
 * /user/forgotpassword:
 *   post:
 *     tags: 
 *       - User
 *     summary: Forgot password
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
 *       200:
 *         description: Password sent to your email
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Confirmation
 */
router.route('/forgotpassword').post(limiter, validate(userValidation.forgotPassword), userController.forgotPassword);

/**
 * @swagger
 * /user/changepassword:
 *   post:
 *     tags: 
 *       - User
 *     summary: Change password
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldpassword:
 *                 type: string
 *               newpassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password changed successfully
 */
router.route('/changepassword').post(limiter, verifyToken, validate(userValidation.changePassword), userController.changePassword);

/**
 * @swagger
 * /user:
 *   post:
 *     tags: 
 *       - User
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User registered successfully
 *   put:
 *     tags: 
 *       - User
 *     summary: Update user information
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               profile_picture:
 *                 type: string
 *     responses:
 *       200:
 *         description: User information updated successfully
 */
router.route('/').post(validate(userValidation.registerUser), userController.registerUser)
                 .put(verifyToken, validate(userValidation.updateUser), userController.updateUser);

module.exports = router;
