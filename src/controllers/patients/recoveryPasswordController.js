import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import * as nodemailer from "nodemailer";
import patientModel from "../../models/patients.js";
import { config } from "../../../config.js";

const recoveryPasswordController = {};

recoveryPasswordController.requestCode = async (req, res) => {
  try {
    const { email } = req.body;
    const patientFound = await patientModel.findOne({ email });
    if (!patientFound)
      return res.status(400).json({ message: "Patient not found" });
    const randomCode = crypto.randomBytes(3).toString("hex");
    const token = jsonwebtoken.sign(
      { email, userType: "Patient", verified: false, randomCode  },
      config.Jwt.secret,
      { expiresIn: "60m" },
    );
    res.cookie("recoveryCookie", token,  { maxAge: 15 * 60 * 1000 });
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
      subject: "Recuperación de cuenta",
      text: `Hola ${patientFound.name} ${patientFound.lastname} acá esta tu código de verificación de cuenta verificación de cuenta: ${randomCode}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(400).json({ message: `Email can't be sent` });
      }
      return res.status(200).json({ message: "Email sent" });
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

recoveryPasswordController.verifyCode = async (req, res) => {
  try {
    const { code } = req.body;

    const token = req.cookies.recoveryCookie;
    const decode = jsonwebtoken.verify(token, config.Jwt.secret);
    const newToken = jsonwebtoken.sign(
      { email: decode.email, userType: "Patient", verified: true },
      config.Jwt.secret,
      { expiresIn: "60m" },
    );
    res.cookie("recoveryCookie", newToken, { maxAge: 15 * 60 * 1000 });
    res.status(200).json({ message: "valid Code" });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal Server error" });
  }
};
recoveryPasswordController.newPassword = async (req, res) => {
  try {
    const { newPassword, confirmedPassword } = req.body;
    if (newPassword !== confirmedPassword)
      return res.status(400).json({ message: "Passwords mut match" });
    const token = req.cookies.recoveryCookie;
    const decode = jsonwebtoken.verify(token, config.Jwt.secret);
    if (!decode.verified)
      return res.status(400).json({ message: "Code not verified" });
    const passwordHashed = await bcrypt.hash(newPassword, 10);
    await patientModel.findOneAndUpdate(
      { email: decode.email },
      { password: passwordHashed },
    );
    res.clearCookie("recoveryCookie")
    res.status(200).json({message: "Password change"})
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: "Internal Server Error"})
  }
};

export default recoveryPasswordController