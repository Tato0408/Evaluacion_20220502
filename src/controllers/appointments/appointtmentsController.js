import appointmentsModel from "../../models/appointments.js";
const appointmentsController = {};

appointmentsController.getAppointment = async (req, res) => {
  try {
    const response = await appointmentsModel.find()
    .populate('patient_id', "name -_id")
    .populate('speciality_id', "specialityName -_id");
    if (!response)
      return res.status(400).json({ message: "Speciality not found" });
    return res.status(200).json({ message: "Data found", Data: response });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

appointmentsController.updateAppointment = async (req, res) => {
  try {
    const {
      patient_id,
      speciality_id,
      appointmentDate,
      reason,
      status,
      observations,
    } = req.body;

    const response = await appointmentsModel.findById(req.params.id);

    if (!response) return res.status(400).json({ message: "Not found" });
    const updateData = {
      patient_id,
      speciality_id,
      appointmentDate,
      reason,
      status,
      observations,
    };
    const payload = await appointmentsModel.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true },
    );
    if (!payload)
      return res.status(400).json({ mesage: "Speciality can't be updated" });
    return res.status(200).json({ message: "Data Updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

appointmentsController.deleteAppointment = async (req, res) => {
  try {
    const response = await appointmentsModel.findById(req.params.id);
    if (!response)
      return res.status(400).json({ message: "Speciality not found" });
    await appointmentsModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Data deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

appointmentsController.insertAppointment = async (req, res) => {
  try {
    const {
      patient_id,
      speciality_id,
      appointmentDate,
      reason,
      status,
      observations,
    } = req.body;

    const newAppointment = new appointmentsModel({
      patient_id,
      speciality_id,
      appointmentDate,
      reason,
      status,
      observations,
    });

    await newAppointment.save();
    return res.status(200).json({ message: "Data save" });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal Server error" });
  }
};
export default appointmentsController;
