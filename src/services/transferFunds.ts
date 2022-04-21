import fs from 'fs';
import path from 'path';
import fetchData from '../model/helpers';
const transferFunds = (transferData: TransferInfo)=>{
    let transferInfo: TransferInfo = transferData;
    const data: DataBase = fetchData;
    let existingAccounts: Balances =   data?.balances;
    const fromAccountExists: Balance | undefined = existingAccounts.find(individualAccount => individualAccount.account === transferInfo.from);
    const toAccountExists: Balance | undefined = existingAccounts.find(individualAccount => individualAccount.account === transferInfo.to);

    
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
    // index of sender's account in balances table
    let fromIndex: number = existingAccounts?.reduce((prev, current, index) => {
      if(current?.account === transferInfo?.from){
        prev = index;
      }
      return prev;
    },-1);

    // index of receiver's account in balances table
    let toIndex: number = existingAccounts?.reduce((prev, current, index) => {
      if(current?.account === transferInfo?.to){
        prev = index;
      }
      return prev;
    },-1);

    // transfer logic
    fromAccountExists.balance = fromAccountExists?.balance - transferInfo?.amount;
    toAccountExists.balance = toAccountExists?.balance + transferInfo?.amount;

    // update sender's account'
    existingAccounts.splice(fromIndex,1,fromAccountExists);

    // update receiver's account'
    existingAccounts.splice(toIndex,1,toAccountExists);
    
    const transaction = {
      "reference": data?.transactions?.length? 
      data?.transactions[data?.transactions?.length-1]["reference"]+1 : 1,
      "senderAccount": transferInfo?.from,
      "amount": transferInfo?.amount,
      "receiverAccount": transferInfo?.to,
     "transferDescription": transferInfo?.transferDescription || "",
     "createdAt": (new Date()).toISOString()
    }

    //  update transactions table
    data?.transactions?.push(transaction);

    // update database.json
    fs.writeFileSync(path.join(__dirname,path.sep,"..","/model/database.json"),JSON.stringify(data))
    return transaction;
}
export default transferFunds;