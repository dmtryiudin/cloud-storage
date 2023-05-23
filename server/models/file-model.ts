import { Schema, model } from "mongoose";

const FileSchema = new Schema({
  owner: { type: String, ref: "User" },
  name: { type: String, required: true, unique: true },
  deleteDate: { type: Number },
  href: { type: String, required: true, unique: true },
  isPublic: { type: Boolean },
  folder: { type: String, ref: "Folder" },
  capacity: { type: Number, required: true },
});

export default model("File", FileSchema);
