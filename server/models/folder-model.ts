import { Schema, model } from "mongoose";

const FolderSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true, unique: true },
  deleteDate: { type: Number },
  isPublic: { type: Boolean, default: false },
  filesCapacity: { type: Number, default: 0 },
});

export default model("Folder", FolderSchema);
