import express from "express";
import jwt from "jwt-decode";
import { signUp } from "../services/userServices";
import { UserData } from "../typings";
import UserModel from "../model/userModel";

const userVerifyEmailController = async (
  req: express.Request,
  res: express.Response,
  _next: express.NextFunction
) => {
  const { verifyToken } = req.query;
  console.log(verifyToken);
  try {
    const decoded: UserData = jwt(`${verifyToken}`);
    console.log(decoded);
    console.log(typeof decoded);
  
    let userData = {
      email: decoded?.email,
    };
    // const user = await UserModel.find({email: decoded.email})
    //console.log(user, "**********")
     await UserModel.findOneAndUpdate(
      {email: decoded.email},
      {verified: true},
      {upsert: true, new: true}
    );
    
  
    console.log("userData", userData);
    return res.status(200).send(`<h1>Email successfully verified</h1>`);
    // --Todo: Error handling

  } catch(err) {
    return res.status(500).json({message: "Internal server error", error: err})
  }
};
export default userVerifyEmailController;
