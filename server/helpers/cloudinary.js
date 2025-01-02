import { v2 as cloudinary } from "cloudinary";
import multer from "multer";


cloudinary.config({
    cloud_name: "dqyvuxqcr",
    api_key: "923879369623352",
    api_secret: "uXYx7eA8qGd0uXe25CI9gHzx4U4"
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
