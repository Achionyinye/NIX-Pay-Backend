import joi from "joi";
import { Request, Response, NextFunction } from "express";

const bankStatementValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { accountNumber, userId } = req.body;
  const schema = joi.object().keys({
    accountNumber: joi.string().length(9).required(),
    userId: joi.string().required(),
  });
  const { value, error } = schema.validate({ accountNumber, userId});
  if (error) {
    res.status(400).json({ message: error });
  } else {
    req.body.accountNumber = value.accountNumber;
    req.body.userId = value.userId;
    next();
  }
};
export default bankStatementValidator;
