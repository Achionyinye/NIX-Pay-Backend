import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../model/userModel";
import { LoginData, UserData } from "../typings";

export async function signUp(userData: UserData) {
  let userDetail = userData;
  const accountNumber = Math.floor(100000000 + Math.random() * 900000000);
  const accountDetails = [{ accountNumber, balance: 0 }];
  let userAlreadyExist = await UserModel.findOne({ email: userDetail?.email });
  if (userAlreadyExist) {
    return { message: "User already exist" };
  }
  const hash = bcrypt.hashSync(userDetail?.password, 10);
  userDetail.password = hash;

  let newUser = new UserModel({ ...userDetail, accountDetails });
  await newUser.save();
  return newUser;
}

export async function login(userDetail: LoginData) {
  try {
    let userAlreadyExist = await UserModel.findOne({
      email: userDetail.email,
    });
    //Todo: Select fields to return
    if (!userAlreadyExist) {
      throw new Error("Invalid login details");
    }
    const result: boolean = bcrypt.compareSync(
      userDetail?.password,
      userAlreadyExist?.password
    );
    if (result) {
      userAlreadyExist = userAlreadyExist.toJSON();
      const token = jwt.sign(
        { email: userAlreadyExist?.email, id: userAlreadyExist?._id },
        `${process.env.JWT_SECRET}`,
        { expiresIn: "100hr" }
      );
      userAlreadyExist.token = token;
       userAlreadyExist.password = undefined;
       userAlreadyExist.role = undefined;
       userAlreadyExist.createdAt = undefined;
       userAlreadyExist.updatedAt = undefined;
       userAlreadyExist.__v = undefined;
      return userAlreadyExist;
    }
  } catch (error) {
    console.log(error);
    return { error: "Invalid login details" };
  }
}
