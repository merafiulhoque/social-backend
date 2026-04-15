import { AppError } from "../globalHandlers/AppError";
import { asyncHandler } from "../globalHandlers/asyncHandler";
import { uploadOnCloudinary } from "../lib/cloudinary";

export const uploadImageController = asyncHandler(
    async (req, res) => {
        if(!req.file) throw new AppError("File is required", 400)
        const uploadedImage = await uploadOnCloudinary(req.file.path, "express-images")
        res.status(201).json({
            success: true,
            message: "Image uploaded successfully",
            data: uploadedImage.url
        })
    }
)