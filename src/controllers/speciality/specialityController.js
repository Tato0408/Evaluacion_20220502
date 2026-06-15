import specialityModel from '../../models/speciality.js'
const specialityController = {};

specialityController.getSpeciality = async(req,res) => {
    try {
        const response = await specialityModel.find();
        if(!response) return res.status(400).json({message: "Speciality not found"})
        return res.status(200).json({message: "Data found", Data: response})
    } catch (error) {        
        console.log(error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

specialityController.updateSpeciality = async(req,res) => {
    try {
        const {
            specialityName,
            description,
            isAvailable
        } = req.body
        
        const response = await specialityModel.findById(req.params.id)

        const updateData = {
            specialityName,
            description,
            isAvailable
        }
        const payload = await specialityModel.findByIdAndUpdate(req.params.id, updateData, {new: true})
        if(!payload) return res.status(400).json({mesage: "Speciality can't be updated"})
        return res.status(200).json({message: "Data Updated"})
    } catch (error) {        
        console.log(error)
        return res.status(500).json({message: "Internal Server error"})
    }
}

specialityController.deleteSpeciality = async (req, res) => {
    try {
        const response = await specialityModel.findById(req.params.id)
        if(!response) return res.status(400).json({message: "Speciality not found"})
        await specialityModel.findByIdAndDelete(req.params.id)
        return res.status(200).json({message: "Data deleted"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}


specialityController.insertSpeciality = async(req,res) => {
    try {
        const {
            specialityName,
            description,
            isAvailable
        } = req.body

        const newSpeciality = new specialityModel({
            specialityName,
            description,
            isAvailable
        })

        await newSpeciality.save()
        return res.status(200).json({message: "Data save"})
    } catch (error) {
        return res.status(500).json({message: "Internal Server error"})
    }
}
export default specialityController

