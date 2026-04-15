import multer from "multer";
import path from "path";
import { AppError } from "../globalHandlers/AppError";

export const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.resolve("uploads")
    cb(null, path.resolve("uploads"));
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname)
    cb(null, Date.now().toString() + ext);
  }
});

export const upload = multer({ storage });

export const uploadImage = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (["image/png", "image/jpeg", "image/jpg"].includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new AppError("Invalid file type", 422));
    }
  }
});
