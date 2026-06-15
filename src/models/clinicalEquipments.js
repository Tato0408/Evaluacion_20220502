/*
    -specialityName
    -description
    -isAviable
*/

import mongoose ,{Schema, model} from 'mongoose'

const clinicalEquipmentsSchema = new Schema ({
    equipmentName: {
        type: String
    },
    description: {
        type: String
    },
    brand: {
        type: String
    },
    model: {
        type: String
    },
    purchaseDate: {
        type: Date
    },
    maintenceDate: {
        type: Date
    },
    condition: {
        type: String
    },
    image: {
        type: String
    },
    public_id: {
        type: String
    },
    status: {
        type: Boolean
    },
    isAvailable: {
        type: Boolean
    },
}, {
    timestamps: true,
    strict: false
});

export default model ("Equipment", clinicalEquipmentsSchema)