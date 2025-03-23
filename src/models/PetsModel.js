import { Schema, model } from "mongoose";

const PetsSchema = new Schema({
  pet_name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  type: {
    type: String,
    required: true,
  },
});

export default model("Pets", PetsSchema);
