import clinicalEquipmentModel from "../../models/clinicalEquipments.js";
import { v2 as cloudinary } from "cloudinary";
const clinicalEquipmentController = {};

clinicalEquipmentController.getClinicalEquipment = async (req, res) => {
  try {
    const response = await clinicalEquipmentModel.find();
    if (!response)
      return res.status(400).json({ message: "Speciality not found" });
    return res.status(200).json({ message: "Data found", Data: response });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

clinicalEquipmentController.updateClinicalEquipment = async (req, res) => {
  try {
    const {
      equipmentName,
      description,
      brand,
      model,
      purchaseDate,
      maintenceDate,
      condition,
      status,
      isAvailable,
    } = req.body;

    const response = await clinicalEquipmentModel.findById(req.params.id);

    if (!response) return res.status(400).json({ message: "Not found" });

    const updateData = {
      equipmentName,
      description,
      brand,
      model,
      purchaseDate,
      maintenceDate,
      condition,
      status,
      isAvailable,
    };

    if (req.file) {
      await cloudinary.uploader.destroy(response.public_id);
      updateData.image = req.file.path;
      updateData.public_id = req.file.filename;
    }
    const payload = await clinicalEquipmentModel.findByIdAndUpdate(
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

clinicalEquipmentController.deleteClinicalEquipment = async (req, res) => {
  try {
    const response = await clinicalEquipmentModel.findById(req.params.id);
    if (!response)
      return res.status(400).json({ message: "Speciality not found" });
    await cloudinary.uploader.destroy(response.public_id);
    await clinicalEquipmentModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Data deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

clinicalEquipmentController.insertClinicalEquipment = async (req, res) => {
  try {
    const {
      equipmentName,
      description,
      brand,
      model,
      purchaseDate,
      maintenceDate,
      condition,
      status,
      isAvailable,
    } = req.body;

    const newClinicalEquipment = new clinicalEquipmentModel({
      equipmentName,
      description,
      brand,
      model,
      purchaseDate,
      maintenceDate,
      condition,
      status,
      isAvailable,
      image: req.file.path,
      public_id: req.file.filename,
    });

    await newClinicalEquipment.save();
    return res.status(200).json({ message: "Data save" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};
export default clinicalEquipmentController;
