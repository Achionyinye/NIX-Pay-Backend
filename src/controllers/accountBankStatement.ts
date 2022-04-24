import express from 'express';
import fetchServices from '../services/fetchServices';

const getBankAccountStatementController =
 async (req: express.Request, res: express.Response, _next: express.NextFunction) =>{
    // check for validation error(s)
    const accountNumber: number = +(req?.params?.accountNumber);
    const result = await fetchServices.fetchBankStatement(accountNumber);

    const key = Object.keys(result[0])[0];
    switch (key) {
      case 'wrongAccount':
        res.json({ message: "Account number does not exist" });
        break;
      case 'transactionNotFound':
        res.json({ message: "No transaction found" });
        break;
      default:
        res.json({ transactions: result });
    }
  }
  export default getBankAccountStatementController;