import joi from 'joi';
import { Request, Response, NextFunction} from 'express';

const accountNumberValidator = (req: Request, res: Response, next: NextFunction) => {
      const {accountNumber} = req.params;
    const schema = joi.object().keys({
      accountNumber: joi.string().length(10).required(),
    });
    const {value, error} = schema.validate({accountNumber});
    if (error) {
      res.status(400).json({ message: error});
    } else {
      req.params.accountNumber = value.accountNumber;
      next();
    }
}
export default accountNumberValidator;