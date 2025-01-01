import { v2 as cloudinary } from "cloudinary";
import multer from "multer";


cloudinary.config({
    cloud_name: "dxil3zax9",
    api_key: "318891393141116",
    api_secret: "F7Qpi6xnCoT84Zwa06hpZFXQBXw"
})

const storage = new multer.memoryStorage()

export const imageUploadUtil = async (file) => {
    const result = await cloudinary.uploader.upload(
        file,
        { resource_type: 'auto' }
    )

    return result
}

export const upload = multer({ storage })
