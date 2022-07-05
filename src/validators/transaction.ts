import joi from "joi";
import { Request, Response, NextFunction } from "express";

const transactionValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    beneficiaryBank,
    beneficiaryName,
    from,
    to,
    amount,
    transferDescription,
    email,
  } = req.body;
  // console.log(req.body);
  const schema = joi.object().keys({
    beneficiaryBank: joi.string(),
    beneficiaryName: joi.string(),
    from: joi.number().integer().min(10).required(),
    to: joi.number().integer().min(10).required(),
    amount: joi.number().integer().min(0).required(),
    transferDescription: joi.string(),
    email: joi.string(),
  });
  const { value, error } = schema.validate({
    beneficiaryBank,
    beneficiaryName,
    from,
    to,
    amount,
    transferDescription,
    email,
  });
  if (error) {
    res.status(400).json({ message: error });
  } else {
    req.body.beneficiaryBank = value.beneficiaryBank;
    req.body.beneficiaryName = value.beneficiaryName;
    req.body.from = value.from;
    req.body.to = value.to;
    req.body.amount = value.amount;
    req.body.transferDescription = value.transferDescription;
    next();
  }
};
export default transactionValidator;
