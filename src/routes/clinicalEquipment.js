import express from 'express'
import clinicalEquipmentController from '../controllers/clinicalEquipments/clinicalEquipmentsController.js'
import upload from '../utils/cloudinaryConfig.js'
const router = express.Router()

router.route("/")
.get(clinicalEquipmentController.getClinicalEquipment)
.post(upload.single("image"), clinicalEquipmentController.insertClinicalEquipment)
router.route("/:id")
.put(upload.single("image"),clinicalEquipmentController.updateClinicalEquipment)
.delete(clinicalEquipmentController.deleteClinicalEquipment)

export default router