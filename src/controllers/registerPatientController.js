import patientsModel from '../models/patients.js'
import {v2 as cloudinary} from 'cloudinary'
import * as nodemailer from 'nodemailer'
import crypto from 'crypto'
import jsonwebtoken from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { config } from '../../config.js'

const registerPatientController = {}

registerPatientController.insertPatient