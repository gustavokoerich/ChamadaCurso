const router = require('express').Router()
const authMiddleware = require('../middlewares/auth');
const indexController = require('../controllers/indexController')

// Middleware

router.use(authMiddleware)

// Rotas de Presenças de Alunos

router.get('/', indexController.indexGet)

router.post('/', indexController.indexPost)

module.exports = router
