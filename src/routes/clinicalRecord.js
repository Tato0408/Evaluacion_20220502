import express from 'express'
import clinicalRecordsController from '../controllers/clinicalRecords/clinicalRecordsController.js'
const router = express.Router()

router.route("/")
.get(clinicalRecordsController.getClinicalRecord)
.post(clinicalRecordsController.insertClinicalRecord)
router.route("/:id")
.put(clinicalRecordsController.updateClinicalRecord)
.delete(clinicalRecordsController.deleteClinicalRecord)

export default router