import express from 'express';
import fetchServices from '../services/fetchServices';

const getBalancesController = 
async (_req: express.Request, res: express.Response, _next: express.NextFunction) => {
    const balances = await fetchServices.fetchBalances();
    res.json({ balances });
  }
  export default getBalancesController;