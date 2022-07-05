import { Request, Response, NextFunction } from "express";
import UserModel from "../model/userModel";
import { comparePasswords } from "../services/generateToken";

const addExtraAccountController = async (req: Request, res: Response) => {
  try{
  const { id } = req.params;
  const { password, bvn } = req.body;

  const user = await UserModel.findOne({ _id: id, bvn });
  if (!user) {
    return res.status(404).json({ message: "User not found go to signup" });
  }console.log(user)
  const validPassword = comparePasswords(`${password}`, user.password);
  if (!validPassword) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  const accountNumber2 = Math.floor(100000000 + Math.random() * 900000000);
  UserModel.findOneAndUpdate(
    { _id: id },
    {
      $push: { accountDetails: { accountNumber: accountNumber2, balance: 0 } },
    },  
    {new:true},
    function (error: any, success: any) {
      if (error) {
        console.log(error);
      } else {
        console.log(success);
        return res.status(201).json(success);
      }
    }
  
  );
}
catch(error){
  console.log("Add extra account error", error)
}
};

export default addExtraAccountController;
