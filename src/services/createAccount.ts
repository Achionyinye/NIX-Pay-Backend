import models from '../model/schemas';
const createAccount = async(accountData: Balance)=>{
    let accountDetail: Balance  = accountData;
    let accountAlreadyExist = await models.BalanceModel.find({account : accountDetail.account});
    if(accountAlreadyExist.length > 0){
      return {message:"Account number already exist"};
    }      
    else{
    let newAccount = new models.BalanceModel({...accountDetail});
    let savedAccounts =  await newAccount.save();
    return savedAccounts;
    } 
}
export default createAccount;