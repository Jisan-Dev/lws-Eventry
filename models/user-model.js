import mongoose, { Schema } from "mongoose";

const schema = new Schema({
  name: {
    required: true,
    type: String,
  },
  email: {
    required: [true, "Please provide an email"],
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  phone: {
    required: true,
    type: String,
  },
  bio: {
    required: true,
    type: String,
  },
});

export const UserModel = mongoose.models.User ?? mongoose.model("User", schema);
