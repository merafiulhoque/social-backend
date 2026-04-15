import { v2 as cloudinary, UploadApiResponse } from 'cloudinary'
import "dotenv/config"
import { AppError } from '../globalHandlers/AppError'
import fs from "fs/promises"

// cloudinary.url(process.env.CLOUDINARY_URL!)

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

export const uploadOnCloudinary = async (localFilePath: any, folder="uploads"): Promise<UploadApiResponse> => {
    if(!localFilePath){
        throw new AppError("Local path is required", 404)
    }
        const uploadResult = await cloudinary.uploader.upload(localFilePath, {folder, resource_type: "image"})
        await fs.unlink(localFilePath)
        return uploadResult    
}
