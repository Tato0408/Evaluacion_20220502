import patientModel from '../../models/patients.js'
import bcrypt from 'bcryptjs'
import jsonwebtoken from 'jsonwebtoken'
import { config } from '../../../config.js'

const loginController = {}

loginController.login = async (req,res) =>{
    try {
        const {email, pass} = req.body
        const response = await patientModel.findOne({email})
        if(!response) return res.status(400).json({message: "Patient not found"})
        if(response.timeOut && response.timeOut > Date.now()) return res.status(400).json({message: "Account blocked"})
        const isMatch = await bcrypt.compare(pass, response.password)
    if(!isMatch){
        response.loginAttemps = (response.loginAttemps || 0) +1
        if(response.loginAttemps >= 5){
            response.timeOut = Date.now()
            response.loginAttemps = 0

            await response.save()
            return res.status(400).json({message: "Account blocked"})
        }
        showTries = 5 - loginAttemps
        return res.status(400).json({mesage: `Invalid password, u have ${showTries} tries` })
    }
    response.loginAttemps = 0
    response.timeOut = null
    await response.save()
    const token = jsonwebtoken.sign(
        {id: response._id, userType: "Patient"},
        config.Jwt.secret,
        {expiresIn: "15m"}
    )
    res.cookie("authCookie", token)
    return res.status(200).json({message: "login succesful"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal server error"})
    }
}

export default loginController