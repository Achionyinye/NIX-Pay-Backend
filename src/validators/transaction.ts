import joi from 'joi';
import { Request, Response, NextFunction} from 'express';

const transactionValidator = (req: Request, res: Response, next: NextFunction) => {
      const {from, to, amount, transferDescription} = req.body;
    const schema = joi.object().keys({
      from: joi.number().integer().min(10**9).max(10**10 - 1).required(),
      to: joi.number().integer().min(10**9).max(10**10 - 1).required(),
      amount: joi.number().integer().min(0).required(),
      transferDescription: joi.string()
    });
    const {value, error} = schema.validate({from, to, amount, transferDescription});
    if (error) {
      res.status(400).json({ message: error});
    } else {
      req.body.from = value.from;
      req.body.to = value.to;
      req.body.amount = value.amount;
      req.body.transferDescription = value.transferDescription;
      next();
    }
}
export default transactionValidator;