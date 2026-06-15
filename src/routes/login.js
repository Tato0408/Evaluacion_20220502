import express from 'express'
import loginController from '../controllers/patients/loginController.js'
const router = express.Router()

router.route("/")
.post(loginController.login)

export default router

