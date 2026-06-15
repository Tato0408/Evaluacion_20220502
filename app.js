import cors from 'cors'
import express from 'express'
import cookieParser from 'cookie-parser'
import registerPatientRoute from './src/routes/registerPatient.js'
import patientRoute from './src/routes/patient.js'
const app = express()

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5173"],
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

app.use("/api/patient", patientRoute)
app.use("/api/registerPatient", registerPatientRoute)

export default app