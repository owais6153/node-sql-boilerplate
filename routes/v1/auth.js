const router = require('express').Router()
const authController = require('../../controllers/auth')
const isAuthenticated = require('../../middleware/auth')

/**
 * @swagger
 * /api/v1/auth/authenticate:
 *   post:
 *     summary: Authenticate User
 *     consumes:
 *      - application/json
 *     produces:
 *      - application/json
 *     tags:
 *     - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     operationId: authenticate
 *     deprecated: false
 *     responses:
 *       '200':
 *         description: ''
 *         headers: {}
 */
router.post('/authenticate', authController.authenticate)

/**
 * @swagger
 * /api/v1/auth/me:
 *   get:
 *     summary: Get My Profile
 *     consumes:
 *      - application/json
 *     produces:
 *      - application/json
 *     tags:
 *     - Auth
 *     parameters:
 *     - name: x-auth-token
 *       in: header
 *       required: true
 *       type: string
 *       description: Auth Token
 *     operationId: getUsers
 *     deprecated: false
 *     responses:
 *       '200':
 *         description: ''
 *         headers: {}
 */
router.get('/me', isAuthenticated, authController.me)

module.exports = router
