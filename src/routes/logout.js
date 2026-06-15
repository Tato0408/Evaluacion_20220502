import express from 'express'
import logoutController from '../controllers/patients/logoutController.js'
const router = express.Router()

router.route("/")
.post(logoutController.logout)

export default router

