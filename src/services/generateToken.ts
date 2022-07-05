import bcrypt from "bcrypt";
import { createHash } from "crypto";

export interface Payload {
  email: string;
  password: string;
  bvn: number;
  fullname: string;
  date: Date;
}

const token = (details: Payload) => {
  return createHash("sha256")
    .update(details.email + details.fullname + details.password + details.bvn + details.date)
    .digest("hex");
};

const comparePasswords = (plainText: string, hash: string) => {
  return bcrypt.compare(plainText, hash);
};

export { token, comparePasswords };
