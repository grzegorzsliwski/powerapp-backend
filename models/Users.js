import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    refreshToken: {
      type: String,
    },
  },
  { minimize: false }
);

const UserModel = (models && models.User) || model("User", userSchema);

export default UserModel;
