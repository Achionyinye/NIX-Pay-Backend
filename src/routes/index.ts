import express from  'express';
import { body, validationResult,param } from 'express-validator';
import fetchData from '../model/helpers';
import createAccount from '../services/createAccount';
import transferFunds from '../services/transferFunds';
import fetchServices from '../services/fetchServices';

const router =  express.Router();
router.post('/create-account', 
// body('account').isInt()
// .withMessage("account must be a number")
// .isLength({min: 10, max: 10})
// .withMessage("account must have exactly 10 digits"),
// body('balance').isFloat().withMessage("Balance must be a number"),
function(req: express.Request, res: express.Response) {
  // check for validation error(s)
  // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }

  let accountDetail: Balance = req.body;  
  const result  = createAccount(accountDetail);

    // if(!result){
    //  res.json({message:"Account number already exist"});
    //  return;
    // }
    // res.json({ balances: result });
  });

router.post('/transfer', 
body('from').isInt()
.withMessage("account must be a number")
.isLength({min: 10, max: 10})
.withMessage("account must have exactly 10 digits"),
body('to').isInt()
.withMessage("account must be a number")
.isLength({min: 10, max: 10})
.withMessage("account must have exactly 10 digits"),
body('amount').isFloat().withMessage("Amount must be a number"),
body('transferDescription').isString().withMessage("Transfer description must be a string"),
function(req: express.Request, res: express.Response, next: express.NextFunction) {
   // check for validation error(s)
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
   }
    let transferInfo: TransferInfo = req.body;
    const result  = transferFunds(transferInfo);
    const key = Object.keys(result)[0];
    switch(key){
      case 'missingSenderMessage':
        res.json({message:"Sender account number does not exist"});
        break;
      case 'missingReceiverMessage':
        res.json({message:"Receiver account number does not exist"});
        break;
      case 'insufficientMessage':
        res.json({message:"Insufficient funds"});
        break;
      default: 
      res.json({ transaction: result });
    }
  });

router.get('/balance', function(req: express.Request, res: express.Response, next: express.NextFunction) {
    res.json({ balances: fetchServices.fetchBalances() });
  });

router.get('/transactions', function(req: express.Request, res: express.Response, next: express.NextFunction) {
    const data: DataBase = fetchData;
    res.json({ transactions: data?.transactions });
  });

router.get('/balance/:accountNumber', 
param('accountNumber').isInt()
  .withMessage("accountNumber must be a number")
  .isLength({min: 10, max: 10})
  .withMessage("Account number must have exactly 10 digits"),
function(req: express.Request, res: express.Response, next: express.NextFunction) {
   // check for validation error(s)
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
   }
    const accountNumber: number = +(req?.params?.accountNumber);
    const result = fetchServices.fetchBalance(accountNumber);
    switch(Boolean(result)) {
      case true:
        res.json({ balance: result });
        break;
      default:
        res.json({ message: "Invalid account number" });
    }
  });

  router.get('/bank-statement/:accountNumber',
  param('accountNumber').isInt()
  .withMessage("accountNumber must be a number")
  .isLength({min: 10, max: 10})
  .withMessage("accountNumber must have exactly 10 digits"),
   function(req: express.Request, res: express.Response, next: express.NextFunction) {
  // check for validation error(s)
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
    const accountNumber: number = +(req?.params?.accountNumber);
    const result = fetchServices.fetchBankStatement(accountNumber);
    
    const key  = Object.keys(result[0])[0];
    switch(key) {
      case 'wrongAccount':
        res.json({ message: "Account number does not exist" });
        break;
      case 'transactionNotFound':
        res.json({ message: "No transaction found" });
        break;
      default:
        res.json({ transactions: result });
    }
  });

  export default router;
