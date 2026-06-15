import clinicalRecordsModel from "../../models/clinicalRecord.js";
const clinicalRecordsController = {};

clinicalRecordsController.getClinicalRecord = async (req, res) => {
  try {
    const response = await clinicalRecordsModel.find()
    .populate('patient_id', "name -_id")
    if (!response)
      return res.status(400).json({ message: "Speciality not found" });
    return res.status(200).json({ message: "Data found", Data: response });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

clinicalRecordsController.updateClinicalRecord = async (req, res) => {
  try {
    const {
      patient_id,
      diagnosis,
      medications,
      medicalNotes,
    } = req.body;

    const response = await clinicalRecordsModel.findById(req.params.id);

    if (!response) return res.status(400).json({ message: "Not found" });
    const updateData = {
      patient_id,
      diagnosis,
      medications,
      medicalNotes,
    };
    const payload = await clinicalRecordsModel.findByIdAndUpdate(
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

clinicalRecordsController.deleteClinicalRecord = async (req, res) => {
  try {
    const response = await clinicalRecordsModel.findById(req.params.id);
    if (!response)
      return res.status(400).json({ message: "Speciality not found" });
    await clinicalRecordsModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Data deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

clinicalRecordsController.insertClinicalRecord = async (req, res) => {
  try {
    const {
      patient_id,
      diagnosis,
      medications,
      medicalNotes,
    } = req.body;

    const newClinicalRecord = new clinicalRecordsModel({
      patient_id,
      patient_id,
      diagnosis,
      medications,
      medicalNotes,});

    await newClinicalRecord.save();
    return res.status(200).json({ message: "Data save" });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal Server error" });
  }
};
export default clinicalRecordsController;
