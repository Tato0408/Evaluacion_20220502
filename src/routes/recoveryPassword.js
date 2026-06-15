import express from 'express'
import recoveryPasswordController from '../controllers/patients/recoveryPasswordController.js'
const router = express.Router()

router.route("/request")
.post(recoveryPasswordController.requestCode)
router.route("/verify")
.post(recoveryPasswordController.verifyCode)
router.route("/new")
.post(recoveryPasswordController.newPassword)

export default router