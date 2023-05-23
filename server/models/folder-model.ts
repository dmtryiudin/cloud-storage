import { ObjectId } from "mongodb";
import { Schema, model } from "mongoose";

const FolderSchema = new Schema({
  owner: { type: ObjectId, ref: "User" },
  name: { type: String, required: true, unique: true },
  deleteDate: { type: Date },
  isPublic: { type: Boolean, default: false },
});

export default model("Folder", FolderSchema);
