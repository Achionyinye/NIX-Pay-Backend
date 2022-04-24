import express from 'express';
import fetchServices from '../services/fetchServices';

const getIndividualBalanceController =
async (req: express.Request, res: express.Response, _next: express.NextFunction) => {
    const accountNumber: number = +(req?.params?.accountNumber);
    const result = await fetchServices.fetchBalance(accountNumber);
    switch (Boolean(result)) {
      case true:
        res.json({ balance: result });
        break;
      default:
        res.json({ message: "Invalid account number" });
    }
  }
  export default getIndividualBalanceController;