import { Router } from "express";
import { uploadImage } from "../lib/multer";
import { uploadImageController } from "../controllers/uploadImage.controller";

const postRouter = Router()


postRouter.post("/upload-image", uploadImage.single("file"), uploadImageController)



export default postRouter