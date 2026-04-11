import { Router } from "express";
import upload from "../lib/multer";

const postRouter = Router()


postRouter.post("/upload-image", upload.single("file"), (req, res) => {
    
})

export default postRouter