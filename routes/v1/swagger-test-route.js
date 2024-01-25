const router = require('express').Router()

/**
 * @swagger
 * /api/v1/swagger-test:
 *   get:
 *     summary: Swagger test api endpoint
 *     consumes:
 *      - application/json
 *     produces:
 *      - application/json
 *     tags:
 *     - Swagger
 *     parameters:
 *     - name: x-auth-token
 *       in: header
 *       required: true
 *       type: string
 *       description: Auth Token
 *     operationId: swagger
 *     deprecated: false
 *     responses:
 *       '200':
 *         description: ''
 *         headers: {}
 */
router.get('/', (req, res) => {
  res.send('Swagger test api endpoint')
})

module.exports = router
