import { Schema, model } from "mongoose";

const FolderSchema = new Schema({
  owner: { type: String, ref: "User", required: true },
  name: { type: String, required: true, unique: true },
  deleteDate: { type: Date },
  isPublic: { type: Boolean, default: false },
});

export default model("Folder", FolderSchema);
