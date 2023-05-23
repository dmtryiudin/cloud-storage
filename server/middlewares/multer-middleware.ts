import multer from "multer";
import { uuid } from "uuidv4";
import path from "path";
import { ApiError } from "../exceptions/api-error";
import { filesBlacklist, imagesWhitelist } from "../consts";

const avatarStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve("./upload/avatars"));
  },
  filename: (req, file, cb) => {
    cb(null, uuid() + ".png");
  },
});

const filesStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve("./upload/files"));
  },
  filename: (req, file, cb) => {
    cb(null, uuid() + path.extname(file.originalname));
  },
});

export const avatarUpload = multer({
  storage: avatarStorage,
  fileFilter: (req, file, cb) => {
    if (!imagesWhitelist.includes(file.mimetype)) {
      return cb(
        ApiError.BadRequest(
          `Only images accepted (${imagesWhitelist.join(", ")})`
        )
      );
    }

    cb(null, true);
  },
});

export const fileUpload = multer({
  storage: filesStorage,
  fileFilter: (req, file, cb) => {
    const fileSize = parseInt(req.headers["content-length"]!);

    if (filesBlacklist.includes(file.mimetype)) {
      return cb(
        ApiError.BadRequest(
          `This file extension is denied, also ${filesBlacklist.join(", ")}`
        )
      );
    }
    if (fileSize >= 104857600) {
      return cb(
        ApiError.BadRequest(`Maximum allowed size of the file is 100MB`)
      );
    }

    cb(null, true);
  },
});
