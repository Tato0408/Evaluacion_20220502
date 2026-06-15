import express from 'express'
import registerPatientController from '../controllers/patients/registerPatientController.js'
import upload from '../utils/cloudinaryConfig.js'
const router = express.Router()

router.route("/insert")
.post(upload.single("profilePhoto"),registerPatientController.insertPatient)
router.route("/verify")
.post(registerPatientController.verifyCode)

export default router