import {v2 as cloudinary} from 'cloudinary'
import {CloudinaryStorage} from 'multer-storage-cloudinary'
import multer from 'multer'
import {config} from '../../config.js'

cloudinary.config({
    cloud_name: config.cloud.cloud_name,
    api_key: config.cloud.api_key,
    api_secret: config.cloud.api_secret
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'HospitalRosales',
        allowedFormats: ['jpg', 'png', 'jpeg']
    }
})

const upload = multer({storage})

export default upload
