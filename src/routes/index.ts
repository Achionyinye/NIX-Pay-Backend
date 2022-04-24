import express from 'express';
import { body, validationResult, param } from 'express-validator';
import fetchData from '../model/helpers';
import createAccount from '../services/createAccount';
import transferFunds from '../services/transferFunds';
import fetchServices from '../services/fetchServices';
import balanceValidator from '../validators/balance';
import createAccountController from '../controllers/createAccount';
import transactionValidator from '../validators/transaction';
import accountNumberValidator from '../validators/accountNumber';
import transferController from '../controllers/transfer';
import getBalancesController from '../controllers/getBalances';
import getIndividualBalanceController from '../controllers/getIndividualBalance';
import getTransactionsController from '../controllers/getTransactions';
import getBankAccountStatementController from '../controllers/accountBankStatement';

const router = express.Router();
router.post('/create-account',
 balanceValidator,
 createAccountController);

router.post('/transfer',
  transactionValidator,
 transferController
   );

router.get('/balances', getBalancesController);

router.get('/transactions', getTransactionsController);

router.get('/balance/:accountNumber',
 accountNumberValidator,
getIndividualBalanceController);

router.get('/bank-statement/:accountNumber',
accountNumberValidator,
 getBankAccountStatementController);

export default router;
