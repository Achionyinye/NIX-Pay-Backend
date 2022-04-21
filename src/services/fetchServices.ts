import fetchData from '../model/helpers';
const fetchBalances = ()=>{
    return fetchData.balances;
}
const fetchBalance = (account: number)=>{
    const accountNumber: number = +(account);

    const data: DataBase = fetchData;
    const existingAccounts = data?.balances;

    const targetAccount = existingAccounts?.find(individualAccount=> individualAccount.account === accountNumber);
    if(!targetAccount){
        return null;
    }
    return targetAccount;
}

const fetchBankStatement = (account: number)=>{
    const accountNumber: number = +(account);
    const data: DataBase = fetchData;
    const accountExists = data?.balances?.find(balance=> balance?.account === accountNumber);

    if(!accountExists){
        return [{wrongAccount: true}];
    }

    const targetAccount = data?.transactions?.find(transaction=> transaction.senderAccount === accountNumber || transaction.receiverAccount === accountNumber);
    if(!targetAccount){
        return [{transactionNotFound: true}];
    }
    const transferHistory = data?.transactions?.filter(transaction=> transaction?.receiverAccount === accountNumber || transaction?.senderAccount === accountNumber)
    return transferHistory;
}
export default {
    fetchBalances,
    fetchBalance,
    fetchBankStatement
}