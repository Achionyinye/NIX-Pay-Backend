
import express from 'express';
import transferFunds from '../services/transferFunds';

const transferController =
async (req: express.Request, res: express.Response, _next: express.NextFunction) => {
    let transferInfo: TransferInfo = req.body;
    const result = await transferFunds(transferInfo);
    
    const key = Object.keys(result)[0];
    switch (key) {
      case 'missingSenderMessage':
        res.json({ message: "Sender account number does not exist" });
        break;
      case 'missingReceiverMessage':
        res.json({ message: "Receiver account number does not exist" });
        break;
      case 'insufficientMessage':
        res.json({ message: "Insufficient funds" });
        break;
      default:
        res.json({ transaction: result });
    }
  }
  export default transferController;