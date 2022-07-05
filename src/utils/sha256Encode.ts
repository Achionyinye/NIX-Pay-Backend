import bcrypt from "bcrypt";
import { createHash } from "crypto";
export interface Payload {
  email: string;
  fullName: string;
  currentDate: Date;
}
const token = (details: Payload) => {
  return createHash("sha256")
    .update(details.email + details.fullName + details.currentDate)
    .digest("hex");
};
// const comparePasswords = (plainText: string, hash: string) => {
//   return bcrypt.compare(plainText, hash);
// };
export default token;
