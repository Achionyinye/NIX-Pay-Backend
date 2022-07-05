import { object } from "joi";
import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    reference: {
      type: mongoose.Types.ObjectId,
      required: true,
      index: true,
    },
    beneficiaryBank: { type: String, required: false, default: "" },
    beneficiaryName: { type: String, required: false, default: "" },
    from: { type: Number, required: true, length: 10 },
    amount: { type: Number, required: true, min: 0 },
    to: { type: Number, required: true, length: 10 },
    balance: { type: Number, required: true },
    transferDescription: { type: String, required: false, default: "" },
  },
  {
    timestamps: {
      currentTime: () => new Date().valueOf(),
    },
  }
);

const TransactionModel = mongoose.model("Transaction", transactionSchema);

export default TransactionModel;
