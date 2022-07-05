import { number, optional, string } from "joi";
import { Interface } from "readline";

export type DataBase = {
  transactions: Transactions;
  balances: Balances;
};

export type Transactions = [Transaction];

export type Transaction = {
  reference: number;
  senderAccount: number;
  amount: number;
  receiverAccount: number;
  transferDescription: string;
  createdAt: string;
};

export type Balances = [Balance];

export type Balance = {
  account: number;
  balance: number;
  createdAt: string;
};

export type TransferInfo = {
  beneficiaryBank: string;
  beneficiaryName: string;
  from: number;
  to: number;
  amount: number;
  transferDescription: string;
  email: string;
  fullName: string;
};

export type UserData = {
  _id?: string;
  fullName: string;
  gender: string;
  userName: string;
  dateOfBirth: string;
  bvn: string;
  email: string;
  religion: string;
  occupation: string;
  address: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
};

export type LoginData = {
  email: string;
  password: string;
};

interface IAccountDetails {
 accountNumber: number;
 balance: number;
 _id: string;
}
