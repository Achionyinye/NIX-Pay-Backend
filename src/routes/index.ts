import express from "express";
import { body, validationResult, param } from "express-validator";
// import fetchData from "../model/helpers";
// import createAccount from "../services/createAccount";
// import transferFunds from "../services/transferFunds";
// import fetchServices from "../services/fetchServices";
import balanceValidator from "../validators/balance";
// import createAccountController from "../controllers/createAccount";
import transactionValidator from "../validators/transaction";
//import bankStatememtValidator from "../validators/bankStatememtValidator";
import userValidators from "../validators/user";
//import newAccountValidator from "../validators/createNewAccount";
import extraAccountValidator from "../validators/extraAccount";
//import customerDashboardValidator from "../validators/customerDashboard";
import transferController from "../controllers/transfer";
//import getBalancesController from "../controllers/getBalances";
import getIndividualBalanceController from "../controllers/getIndividualBalance";
import getTransactionsController from "../controllers/getTransactions";
import getBankAccountStatementController from "../controllers/accountBankStatement";
import userControllers from "../controllers/createUser";
import getUserDashboard from "../controllers/customerDashboard";
//import updateAcBalanceController from "../controllers/updateAccountBalance";
import addExtraAccountController from "../controllers/addExtraAccount";
import userVerifyEmailController from "../controllers/userVerifyEmail";
//import createNewAccountController from '../controllers/createNewAccountController';
import auth from "../middlewares/auth";

const router = express.Router();

// router.post("/create-account", balanceValidator, createAccountController);

//router.post("/create-new-account", newAccountValidator);
//  createNewAccountController);

router.post(
  "/user",
  userValidators.userValidator,
  userControllers.createUserController
  );

  router.post(
    "/login",
    userValidators.loginValidator,
    userControllers.loginController
  );

router.post(
  "/transfer",
  transactionValidator,
   auth,
  transferController
);


router.post(
  "/add-extra-account/:id",
  extraAccountValidator,
  auth,
  addExtraAccountController
);


// router.put(
//   "/update-balance/:id",
//   //auth,
//   updateAcBalanceController
//  // (req, res) => {res.send("hey")}
// );

//router.get("/balances", auth, getBalancesController);

router.get("/transactions", auth, getTransactionsController);

router.get(
  "/balance",
  //accountNumberValidator,
  auth,
  getIndividualBalanceController
);

router.get(
  `/bank-statement/:accountNumber`,
   // bankStatememtValidator,
  //   auth,
  getBankAccountStatementController
);

router.get(`/customer-dashboard`, auth, getUserDashboard);

router.get(`/auth/verify-email`, userVerifyEmailController);

// router.get(`/auth/forget-password`, userForgetPasswordController);

export default router;
