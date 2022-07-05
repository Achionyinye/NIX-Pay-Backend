import mongoose from "mongoose";
import balance from "../validators/balance";

const balanceSchema = new mongoose.Schema(
  {
    account: { type: Number, required: true },
    balance: { type: Number, required: true },
  },
  
  {
    timestamps: {
      currentTime: () => new Date().valueOf(),
    },
  }
 // balance: { type: Number, required: true, unique: true },
);

const BalanceModel = mongoose.model("Balance", balanceSchema);


export default BalanceModel;
