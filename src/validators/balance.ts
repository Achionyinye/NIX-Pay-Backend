import joi from 'joi';
import { Request, Response, NextFunction} from 'express';

const balanceValidator = (req: Request, res: Response, next: NextFunction) => {
      const {account, balance} = req.body;
    const schema = joi.object().keys({
      account: joi.number().integer().min(10**9).max(10**10 - 1).required(),
      balance: joi.number().integer().min(0).required()
    });
    const {value, error} = schema.validate({account, balance});
    if (error) {
      res.status(400).json({ message: error});
    } else {
      req.body.account = value.account;
      req.body.balance = value.balance;
      next();
    }
}
export default balanceValidator;