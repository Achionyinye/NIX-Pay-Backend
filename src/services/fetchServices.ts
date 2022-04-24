import fetchData from '../model/helpers';
import BalanceModel from '../model/balanceModel';
import TransactionModel from '../model/transactionModel';
const fetchBalances = async ()=>{
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
}
 const fetchBalance = async (account: number)=>{
    const accountNumber: number = +(account);

    const targetAccount = await BalanceModel.findOne({account: +accountNumber});
    if(!targetAccount){
        return null;
    }
    return targetAccount;
}

const fetchBankStatement = async (account: number)=>{
    const accountNumber: number = +(account);
   // const data: DataBase = fetchData;
    const accountExists = await BalanceModel.findOne({account: accountNumber});

    if(!accountExists){
        return [{wrongAccount: true}];
    }

    const targetAccount = await TransactionModel.findOne({$or: [{from: accountNumber}, {to: accountNumber}]});
    if(!targetAccount){
        return [{transactionNotFound: true}];
    }
    const transferHistory = await TransactionModel.find({$or: [{from: accountNumber}, {to: accountNumber}]});
    return transferHistory;
}
const fetchTransactions = async ()=>{
    const data = await TransactionModel.find({});
    return data;
}

export default {
    fetchBalances,
    fetchBalance,
    fetchBankStatement,
    fetchTransactions
}