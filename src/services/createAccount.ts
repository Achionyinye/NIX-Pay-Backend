import fs from 'fs';
import path from 'path';
import fetchData from '../model/helpers';
import models from '../model/schemas';
const createAccount = (accountData: Balance)=>{
    // create database.json if it does not exist
  // try {
  //   // fs.stat
  //   fs.statSync(path.join(__dirname,path.sep,"..","/model/database.json"));
  //        } 
  // catch (error) {
  //         fs.writeFile(path.join(__dirname,path.sep,"..","/model/database.json"),JSON.stringify({"transactions":[], "balances":[]}), function (err) {
  //           if (err) throw err;
  //           console.log('File is created successfully.');
  //         })
  //   }

    let accountDetail: Balance  = accountData;
    // accountDetail.createdAt = (new Date()).toISOString();
    const data: DataBase = fetchData;
    let existingAccounts =  models.BalanceModel.find({account: accountDetail.account});
    // const alreadyExists: Balance | undefined = existingAccounts.find(individualAccount => individualAccount.account === accountDetail.account);
    // if(alreadyExists){
    // //  res.json({message:"Account number already exist"});
    //  return null;
    // }else{

    //     // update existingAccounts
    //     existingAccounts.push(accountDetail);
    //     data.balances = existingAccounts;
    
    //     // update dataBase
    //     fs.writeFileSync(path.join(__dirname,path.sep,"..","/model/database.json"),JSON.stringify(data))
    //     return existingAccounts;
    // }
    console.log(existingAccounts);
    
}
export default createAccount;