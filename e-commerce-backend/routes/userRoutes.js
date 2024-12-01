const router = require('express').Router()
const { register, verifyEmail, resendVerification, resetPassword, forgetPassword, signin } = require('../controllers/userController')

router.post('/register',  register)
router.get('/verifyUser /:token', verifyEmail)
router.post('/resendverification', resendVerification)
router.post('/resetpassword/:token', resetPassword)
router.post('forgetpassword/:token', forgetPassword)
router.post('/login', signin)

module.exports = router