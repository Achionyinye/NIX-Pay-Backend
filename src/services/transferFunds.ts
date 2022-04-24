import BalanceModel from '../model/balanceModel';
import TransactionModel from '../model/transactionModel';
 const transferFunds = async (transferData: TransferInfo)=>{
    let transferInfo: TransferInfo = transferData;
//     const data: DataBase = fetchData;
//     let existingAccounts: Balances =   data?.balances;
       const fromAccountExists = await BalanceModel.findOne({account: transferInfo.from});
       const toAccountExists = await BalanceModel.findOne({account: transferInfo.to});

    if(!fromAccountExists){
      return {missingSenderMessage:"Sender account number does not exist"};
    }
    if(!toAccountExists){
      return {missingReceiverMessage:"Receiver account number does not exist"};
    }

    const amountValid: boolean = transferInfo?.amount >= 0 && transferInfo?.amount <= fromAccountExists?.balance;
    if(!amountValid){
      return {insufficientMessage:"Insufficient funds"};
    }
    // transfer logic
    const fromAccountBalance = fromAccountExists?.balance - transferInfo?.amount;
    const toAccountBalance = toAccountExists?.balance + transferInfo?.amount;

    // update sender's account'
    await BalanceModel.findByIdAndUpdate(fromAccountExists?._id, {balance: fromAccountBalance});
    
        // update receiver's account'
    await BalanceModel.findByIdAndUpdate(toAccountExists?._id, {balance: toAccountBalance});
    
    const transactionData = { 
      "from": transferInfo?.from,
      "amount": transferInfo?.amount,
      "to": transferInfo?.to,
     "transferDescription": transferInfo?.transferDescription || ""
    }

    //  create transaction
    const transaction = new TransactionModel(transactionData);
    const savedTransaction = await transaction.save();

    return savedTransaction;
 }
export default transferFunds;