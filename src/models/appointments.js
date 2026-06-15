import mongoose ,{Schema, model} from 'mongoose'

const appointmentsSchema = new Schema ({
    patient_id: {
        type: Schema.Types.ObjectId,
        ref: "Patients"
    },
    speciality_id: {
        type: Schema.Types.ObjectId,
        ref: "Speciality"
    },
    appointmentDate: {
        type: Date
    },
    reason: {
        type: String
    },
    status: {
        type: String
    },
    observations: {
        type: String
    }
}, {
    timestamps: true,
    strict: false
});

export default model ("Appointments", appointmentsSchema)