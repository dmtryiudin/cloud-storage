import { Schema, model } from "mongoose";

const SettingsSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  isDarkTheme: { type: Boolean, default: false },
  tableFiles: { type: Boolean, default: true },
});

export default model("Settings", SettingsSchema);
