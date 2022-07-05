import express from "express";
import UserModel from "../model/userModel";
import fetchServices from "../services/fetchServices";

interface IAccountDetails {
  accountNumber: number;
  balance: number;
  _id: string;
}

const getBankAccountStatementController = async (
  req: express.Request,
  res: express.Response,
  _next: express.NextFunction
) => {
  
  let { accountNumber } = req.params;

  const result = await fetchServices.fetchBankStatement({
    accountNumber: Number(accountNumber),
  });

  res.status(200).json({transactions: result});

};
export default getBankAccountStatementController;
