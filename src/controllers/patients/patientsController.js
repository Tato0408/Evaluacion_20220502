import patientsModel from '../../models/patients.js'
import {v2 as cloudinary} from 'cloudinary'
const patientController = {};

patientController.getPatients = async(req,res) => {
    try {
        const response = await patientsModel.find();
        if(!response) return res.status(400).json({message: "Patients not found"})
        return res.status(200).json({message: "Data found", Data: response})
    } catch (error) {        
        console.log(error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

patientController.updatePatient = async(req,res) => {
    try {
        const {
            name,
            lastname,
            email,
            birthdate,
            phone,
            address,
            phoneEmergencyContact,
            isVerified,
            timeOut,
            loginAttemps
        } = req.body
        
        const response = await patientsModel.findById(req.params.id)

        const updateData = {
            name,
            lastname,
            email,
            password: response.password,
            birthdate,
            phone,
            address,
            phoneEmergencyContact,
            isVerified,
            timeOut,
            loginAttemps
        }
        if(req.file){
            await cloudinary.uploader.destroy(response.public_id)
            updateData.profilePhoto = req.file.path
            updateData.public_id = req.file.filename
        }

        const payload = await patientsModel.findByIdAndUpdate(req.params.id, updateData, {new: true})
        if(!payload) return res.status(400).json({mesage: "Patient can't be updated"})
        return res.status(200).json({message: "Data Updated"})
    } catch (error) {        
        console.log(error)
        return res.status(500).json({message: "Internal Server error"})
    }
}

patientController.deletePatient = async (req, res) => {
    try {
        const response = await patientsModel.findById(req.params.id)
        if(!response) return res.status(400).json({message: "Patient not found"})
        await cloudinary.uploader.destroy(response.public_id)
        await patientsModel.findByIdAndDelete(req.params.id)
        return res.status(200).json({message: "Data deleted"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export default patientController

