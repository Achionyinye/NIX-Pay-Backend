import { Request, Response, NextFunction } from "express";
// import { string } from "joi";
import jwt from "jsonwebtoken";
import UserModel from "../model/userModel";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //  console.log(req.headers.authorization?.split('\n'));
    const token = req?.headers?.authorization?.split(" ")[1];
   
    let decoded;
    if (token) {
      decoded = jwt.verify(token, `${process.env.JWT_SECRET}`);
    }
    
    if (typeof decoded === "string") {
      decoded = JSON.parse(decoded);
    }
    const user = await UserModel.findOne({ _id: decoded.id });
     req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Session expired, please log in again" });
  }
};
export default auth;
