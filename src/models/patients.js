/*
    -name
    -lastName
    -email
    -password
    -birthdate
    -phone
    -address
    -phoneEmergencyContact[
        {
            -phone
            -nameEmergecyContact
        }
    ]
    -profilePhoto
    -isVerified
    -loginAttemps
    -timeOut
*/

import mongoose ,{Schema, model} from 'mongoose'

const patientSchema = new Schema ({
    name: {
        type: String
    },
    lastname: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    birthdate: {
        type: Date
    },
    phone: {
        type: String
    },
    address: {
        type: String
    },
    phoneEmergencyContact: [
        {
            phone: {
                type: Number
            },
            nameEmergencyContact: {
                type: String
            }
        }
    ],
    profilePhoto: {
        type: String
    },
    public_id: {
        type: String
    },
    isVerified: {
        type: Boolean
    },
    timeOut: {
        type: Boolean
    },
    loginAttemps: {
        type: Number
    }
}, {
    timestamps: true,
    strict: false
});

export default model ("Patients", patientSchema)