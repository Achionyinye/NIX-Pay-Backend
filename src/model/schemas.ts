import mongoose from 'mongoose';

const balanceSchema = new mongoose.Schema({
    account: {type : Number, required: true},
    balance: {type : Number, required: true},
  },
  {
    timestamps: {
      currentTime: () => (new Date()).valueOf(),
    },
  });

  const BalanceModel = mongoose.model('Balance', balanceSchema);

  const transactionSchema = new mongoose.Schema({
    reference: {type : Number, required: true},
    senderAccount: {type : Number, required: true},
    amount: {type : Number, required: true},
    receiverAccount: {type : Number, required: true},
    transferDescription: {type : String, required: true},
  },
  {
    timestamps: {
      currentTime: () => (new Date()).valueOf(),
    },
  });

  const TransactionModel = mongoose.model('Transaction', transactionSchema);


export default {BalanceModel, TransactionModel};

