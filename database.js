import mongoose from 'mongoose'

mongoose.connect("mongodb://localhost:27017/HospitalRosales")

const connection = mongoose.connection;

connection.on("open", () => {
    console.log("MongoDb connected")
})

connection.on("disconnected", () => {
    console.log("MongoDb disconnected")
})

connection.on("error", (error) => {
    console.log("MongoDb error", error)
})