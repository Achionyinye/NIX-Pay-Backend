import joi from "joi";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";

const newAccountValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { fname, email, dob, gender, address, number } = req.body;
  const saltRounds: string = `${process.env.BCRYPT_SALT}`;
  const schema = joi.object().keys({
    fname: joi.string().required(),
    email: joi.string().required(),
    dob: joi.string().required(),
    gender: joi.string().required(),
    address: joi.string().required(),
    number: joi.number().required(),
  });
  const { value, error } = schema.validate({
    fname,
    email,
    dob,
    gender,
    address,
    number,
  });
  if (error) {
    res.status(400).json({ message: error });
  } else {
    req.body.fname = value.fname;
    req.body.email = value.email;
    req.body.dob = value.dob;
    req.body.gender = value.gender;
    req.body.adress = value.address;
    req.body.number = value.number;
  }
  next();
};
export default newAccountValidator;
