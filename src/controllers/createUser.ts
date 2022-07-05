import express from "express";
import { sendEmail } from "../utils/sendEmail";
import passLink from "../template/verifyEmail.template";
import { signUp, login } from "../services/userServices";
import { UserData } from "../typings";
import token from "../utils/sha256Encode";
import jwt from "jsonwebtoken";

const createUserController = async function (
  req: express.Request,
  res: express.Response,
  _next: express.NextFunction
) {
  try {
    let userDetail = req.body;
    let { email, userName } = req.body;
    let userData: UserData = {
      fullName: req.body.fullName,
      gender: req.body.gender,
      userName: req.body.userName,
      dateOfBirth: req.body.dateOfBirth,
      bvn: req.body.bvn,
      email: req.body.email,
      religion: req.body.religion,
      occupation: req.body.occupation,
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    };
    const result = await signUp(userData);
    const newToken = jwt.sign({ ...userDetail }, `${process.env.JWT_SECRET}`, {
      expiresIn: "100 days",
    });



    const link = `http://localhost:3000/api/auth/verify-email/?verifyToken=${newToken}`;
    console.log("hello");
    await sendEmail(email, "verify email", passLink(userName, link));

    return res
      .status(201)
      .json({ message: `A verification email has been sent to ${email}`, token: newToken });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

const loginController = async function (
  req: express.Request,
  res: express.Response,
  _next: express.NextFunction
) {
  let userDetail = req.body;
  console.log("Finally in controller");

  try {
    const result = await login(userDetail);
    console.log(result);
    if (result.error) {
      console.log("error in login");

      return res.status(404).json({ error: result.error });
    }
    console.log("It was a success in login");
    return res.status(200).json({ user: result });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
export default { createUserController, loginController };
