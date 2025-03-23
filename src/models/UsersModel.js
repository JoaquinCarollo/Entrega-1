import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  first_name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
  },
  pets: {
    type: [],
  },
});

export default model("User", UserSchema);
