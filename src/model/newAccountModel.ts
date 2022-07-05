import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fname: { type: String, required: true },
    email: { type: String, required: true },
    dob: { type: String, required: true },
    gender: { type: String, required: true },
    address: { type: String, required: true },
    number: { type: String, required: true },
    accountID: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Balance",
        required: true,
      },
    ],
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], required: true },
  },
  {
    timestamps: {
      currentTime: () => new Date().valueOf(),
    },
  }
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
