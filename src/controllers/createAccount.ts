import express from 'express';
import createAccount from '../services/createAccount';

const createAccountController =
    async function (req: express.Request, res: express.Response, _next: express.NextFunction) {
        let accountDetail: Balance = req.body;
        const result = await createAccount(accountDetail);
        res.json({ balance: result });
}
export default createAccountController;