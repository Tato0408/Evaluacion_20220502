import patientsModel from "../models/patients.js";
import { v2 as cloudinary } from "cloudinary";
import * as nodemailer from "nodemailer";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { config } from "../../config.js";

const registerPatientController = {};

registerPatientController.insertPatient = async (req, res) => {
  try {
    const {
      name,
      lastname,
      email,
      password,
      birthdate,
      phone,
      address,
      phoneEmergencyContact,
      isVerified,
      timeOut,
      loginAttemps,
    } = req.body;
    const existEmail = await patientsModel.findOne({ email });
    if (existEmail)
      return res.status(400).json({ message: "Patient alredy exist", data: existEmail });
    const passwordHashed = await bcrypt.hash(password, 10);
    const randomCode = crypto.randomBytes(3).toString("hex");
    const token = jsonwebtoken.sign(
      {
        randomCode,
        name,
        lastname,
        email,
        password: passwordHashed,
        birthdate,
        phone,
        address,
        phoneEmergencyContact,
        isVerified,
        timeOut,
        loginAttemps,
        profilePhoto: req.file.path,
        public_id: req.file.filename,
      },
      config.Jwt.secret,
      {
        expiresIn: "15m",
      },
    );

    res.cookie("registrationCookie", token, { maxAge: 15 * 60 * 1000 });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.email.user_email,
        pass: config.email.user_password,
      },
    });

    const mailOptions = {
      from: config.email.user_email,
      to: email,
      subject: "Verificación de cuenta",
      text: `Hola ${name} ${lastname} acá esta tu código de verificación de cuenta verificación de cuenta: ${randomCode}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(400).json({ message: `Email can't be sent` });
      }
      return res.status(200).json({ message: "Email sent" });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

registerPatientController.verifyCode = async (req, res) => {
  try {
    const { verifyCode } = req.body;
    const token = req.cookies.registrationCookie;
    const decode = jsonwebtoken.verify(token, config.Jwt.secret);
    console.log(token)
    const {
      randomCode: storedCode,
      name,
      lastname,
      email,
      password,
      birthdate,
      phone,
      address,
      phoneEmergencyContact,
      isVerified,
      timeOut,
      loginAttemps,
      profilePhoto,
      public_id
    } = decode;

    if (verifyCode !== storedCode)
      return res.status(400).json({ message: "Invalid code" });

    const payload = new patientsModel({
        name,
        lastname,
        email,
        password,
        birthdate,
        phone,
        address,
        phoneEmergencyContact,
        isVerified,
        timeOut,
        loginAttemps,
        profilePhoto,
        public_id
    });

    await payload.save();
    return res.status(200).json({message: 'Data save', data: payload})
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: "Internal Server Error"})
  }
};

export default registerPatientController

