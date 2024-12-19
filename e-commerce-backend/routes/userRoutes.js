const router = require('express').Router()
const { register, verifyEmail, resendVerification, resetPassword, forgetPassword, signin } = require('../controller/userController')
const upload = require('../middleware/fileUpload')

router.post('/register',upload.single('user-image'),  register)
router.get('/verifyUser/:token', verifyEmail)
router.post('/resendverification', resendVerification)
router.post('/forgetpassword', forgetPassword)
router.post('/resetpassword/:token', resetPassword)
router.post('/login', signin)

module.exports = router