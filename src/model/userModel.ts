import mongoose, { Schema } from "mongoose";
//import UserType from "../typings/userType";

let userSchema = new Schema(
  {
    fullName: { type: String, required: true },
    gender: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    dateOfBirth: { type: String, required: true },
    bvn: { type: String, required: true, unique: true },
    religion: { type: String, required: true },
    occupation: { type: String, required: true },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    accountDetails: [
      {
        accountNumber: { type: Number, required: true, unique: true },
        balance: { type: Number, required: true },
      },
    ],
    password: { type: String, required: true },
    verified: { type: Boolean, default: false },
    // confirmPassword: { type: String, required: true },
    //role: { type: String, enum: ['user', 'admin'] },
  },
  {
    timestamps: {
      currentTime: () => new Date().valueOf(),
    },
  }
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
