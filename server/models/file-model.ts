import { Schema, model } from "mongoose";

const FileSchema = new Schema({
  owner: { type: String, ref: "User", required: true },
  name: { type: String, required: true, unique: true },
  deleteDate: { type: Date },
  href: { type: String, required: true, unique: true },
  isPublic: { type: Boolean },
  folder: { type: String, ref: "Folder" },
});

export default model("File", FileSchema);
