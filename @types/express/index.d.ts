import {UserData} from '../../src/typings';

declare global {
  namespace Express {
    interface Request {
      user: UserData;
    }
  }
}