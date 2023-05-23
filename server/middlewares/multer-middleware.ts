import multer from "multer";
import { uuid } from "uuidv4";
import path from "path";
import { ApiError } from "../exceptions/api-error";

const whitelist = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve("./upload/avatars"));
  },
  filename: (req, file, cb) => {
    cb(null, uuid() + ".png");
  },
});
export const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!whitelist.includes(file.mimetype)) {
      return cb(
        ApiError.BadRequest(`Only images accepted (${whitelist.join(", ")})`)
      );
    }

    cb(null, true);
  },
});
