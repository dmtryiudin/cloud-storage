import { ObjectId } from "mongodb";
import { Schema, model } from "mongoose";

const FileSchema = new Schema({
  owner: { type: ObjectId, ref: "User" },
  name: { type: String, required: true, unique: true },
  deleteDate: { type: Date },
  href: { type: String, required: true, unique: true },
  isPublic: { type: Boolean },
  folder: { type: ObjectId, ref: "Folder" },
});

export default model("File", FileSchema);
