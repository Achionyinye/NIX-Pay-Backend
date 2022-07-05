import TransactionModel from "../model/transactionModel";
import UserModel from "../model/userModel";
import { TransferInfo } from "../typings";

const transferFunds = async (transferInfo: TransferInfo, userid: string) => {
  let fromAccountExists = await UserModel.findById({
    _id: userid,
  });
  let toAccountExists = await UserModel.findOne({
    email: transferInfo.email,
  });
  console.log(toAccountExists);
  if (!fromAccountExists) {
    return { missingSenderMessage: "Sender account number does not exist" };
  }
  if (!toAccountExists) {
    return { missingReceiverMessage: "Receiver account number does not exist" };
  }

  const accountFrom = fromAccountExists.accountDetails.find(
    (account: any) => account.accountNumber === transferInfo.from
  );
  const accountFromId = fromAccountExists.accountDetails.findIndex(
    (account: any) => account.accountNumber === transferInfo.from
  );
  const accountTo = toAccountExists.accountDetails.find(
    (account: any) => account.accountNumber === transferInfo.to
  );
  const accountToId = toAccountExists.accountDetails.findIndex(
    (account: any) => account.accountNumber === transferInfo.to
  );

  const amountValid: boolean =
    transferInfo?.amount >= 0 && transferInfo?.amount <= accountFrom?.balance;
  if (!amountValid) {
    return { insufficientMessage: "Insufficient funds" };
  }
  // transfer logic
  // const fromAccountBalance = accountFrom?.balance - transferInfo?.amount;
  // const toAccountBalance = accountTo?.balance + transferInfo?.amount;
  accountFrom.balance -= transferInfo.amount;
  accountTo.balance += transferInfo.amount;

  fromAccountExists = fromAccountExists.accountDetails.splice(
    accountFromId,
    1,
    accountFrom
  );

  toAccountExists = toAccountExists.accountDetails.splice(
    accountToId,
    1,
    accountTo
  );

  // update sender's account'
  const sender = await UserModel.findByIdAndUpdate(
    { _id: userid },
    {
      $set: { accountDetails: fromAccountExists },
    },
    {
      upsert: true,
      runValidators: true,
    }
  );

  // update receiver's account'
  const receiver = await UserModel.findOneAndUpdate(
    { email: transferInfo.email },
    {
      $set: { accountDetails: toAccountExists },
    },
    {
      upsert: true,
      runValidators: true,
    }
  );

  const transactionData = {
    beneficiaryBank: transferInfo?.beneficiaryBank || "",
    beneficiaryName: transferInfo?.beneficiaryName || "",
    from: transferInfo?.from,
    amount: transferInfo?.amount,
    to: transferInfo?.to,
    transferDescription: transferInfo?.transferDescription || "",
    balance: accountFrom.balance,
    reference: userid,
  };

  //  create transaction
  const transaction = new TransactionModel(transactionData);
  await sender.save();
  await receiver.save();
  const savedTransaction = await transaction.save();

  return savedTransaction;
};
export default transferFunds;
