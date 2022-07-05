import fetchData from "../model/helpers";
import BalanceModel from "../model/balanceModel";
import TransactionModel from "../model/transactionModel";
import UserModel from "../model/userModel";

interface IAccountDetails {
  accountNumber: number;
  balance: number;
  _id: string;
}

const fetchBalances = async () => {
  // const pipeline = [
  //     {
  //         $match: {}
  //     },
  //     {
  //       $facet: {
  //         metadata: [ { $count: 'total' } ],
  //         data: [ { $skip: 5 }, { $limit: 5 } ]
  //     }
  //     },
  //     {
  //       $project: {
  //         data: 1,
  //         // Get total from the first element of the metadata array
  //         total: { $arrayElemAt: [ '$metadata.total', 0 ] }
  //     }
  // }
  //   ]
  //const balances = await BalanceModel.aggregate(pipeline);
  const balances = await BalanceModel.find({});
  return balances;
};
const fetchBalance = async (id: string) => {
  const userID: string = id;

  const targetAccount = await UserModel.findOne({ _id: userID });
  if (!targetAccount) {
    return null;
  }
  const balanceDetail = {fullName: targetAccount.fullName, accountDetails: targetAccount.accountDetails};
  return balanceDetail;
};

const fetchBankStatement = async (accountDetails: { accountNumber: number}) => {
let { accountNumber } = accountDetails;
 //const transactions = await TransactionModel.find({ reference: userId });
const transactions = await TransactionModel.find({
  // reference: userId,
  $or: [{ from: accountNumber }, { to: accountNumber }],
});

return transactions;
// let userInfo = await UserModel.findById({ _id: userId });
// const accounts: IAccountDetails[] = userInfo.accountDetails;
// const accountExist = userInfo.accountDetails.find(
//   (accountDetail: IAccountDetails) => accountDetail.accountNumber === accountNumber
// );
    
// let accountExists;
// if(accountExist){
//   accountExists = await BalanceModel.findOne({ account: accountNumber });

// }

//   if (!accountExists) {
//     return [{ wrongAccount: true }];
//   }

//   const targetAccount = await TransactionModel.findOne({
//     $or: [{ from: accountNumber }, { to: accountNumber }],
//   });
//   if (!targetAccount) {
//     return [{ transactionNotFound: true }];
//   }
//   const transferHistory = await TransactionModel.find({
//     $or: [{ from: accountNumber }, { to: accountNumber }],
//   });
//   return transferHistory;
};
const fetchTransactions = async () => {
  const data = await TransactionModel.find({});
  return data;
};

const fetchUser = async () => {
  const data = await UserModel.find({});
  return data;
};

export default {
  fetchBalances,
  fetchBalance,
  fetchBankStatement,
  fetchTransactions,
  fetchUser,
};
