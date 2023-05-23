import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  login: { type: String, unique: true, required: true },
  email: { type: String },
  password: { type: String, required: true },
  isActivated: { type: Boolean, default: false },
  activationLink: { type: String },
  name: { type: String },
  country: { type: String },
  avatar: { type: String },
  registrationDate: { type: Date, require: true },
  roles: [{ type: String, ref: "Role" }],
  isBanned: { type: Boolean, default: false },
});

export default model("User", UserSchema);
