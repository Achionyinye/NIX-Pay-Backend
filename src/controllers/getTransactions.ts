import express from 'express';
import fetchServices from '../services/fetchServices';


const getTransactionsController =
async (_req: express.Request, res: express.Response, _next: express.NextFunction) =>{
    const data = await fetchServices.fetchTransactions();
   res.json({ transactions: data });
  }
  export default getTransactionsController;