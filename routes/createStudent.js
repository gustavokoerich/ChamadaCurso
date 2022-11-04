const router = require('express').Router()
const authMiddleware = require('../middlewares/auth');
const createStudentController = require('../controllers/createStudentController')

router.use(authMiddleware)

router.get('/cadastro', createStudentController.studentGet)

router.post('/cadastro', createStudentController.studentPost)

module.exports = router
