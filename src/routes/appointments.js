import express from 'express'
import appointmentsController from '../controllers/appointments/appointtmentsController.js'
const router = express.Router()

router.route("/")
.get(appointmentsController.getAppointment)
.post(appointmentsController.insertAppointment)
router.route("/:id")
.put(appointmentsController.updateAppointment)
.delete(appointmentsController.deleteAppointment)

export default router