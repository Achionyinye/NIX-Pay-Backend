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

  

export default BalanceModel;

