import express from 'express';
import fetchServices from '../services/fetchServices';

const getIndividualBalanceController =
async (req: express.Request, res: express.Response, _next: express.NextFunction) => {
    //const userID: string = req?.user;
    console.log("request.user", req.user);
    
    // const result = await fetchServices.fetchBalance(userID);
    // switch (Boolean(result)) {
    //   case true:
    //     res.status(200).json({ balance: result });
    //     break;
    //   default:
    //     res.status(400).json({ message: "Invalid account number" });
    // }
  }
  export default getIndividualBalanceController;