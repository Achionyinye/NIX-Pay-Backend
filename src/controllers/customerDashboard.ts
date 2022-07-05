import express from "express";
import UserModel from "../model/userModel";

const getUserDashboard = async function (
  req: express.Request,
  res: express.Response,
  _next: express.NextFunction
) {
  try {
    let user = await UserModel.findById({ _id: req.user._id });
    if(!user){
      return res.status(404).json({error: "User not found"});
    }
     return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
  }
};
export default getUserDashboard;
