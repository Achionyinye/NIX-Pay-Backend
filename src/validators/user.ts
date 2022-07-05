import joi from "joi";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import Joi from "joi";

const userValidator = (req: Request, res: Response, next: NextFunction) => {
  const {
    fullName,
    gender,
    userName,
    dateOfBirth,
    bvn,
    email,
    religion,
    occupation,
    address,
    phoneNumber,
    password,
    confirmPassword,
  } = req.body;
  const saltRounds: string = `${process.env.BCRYPT_SALT}`;
  const schema = joi.object().keys({
    fullName: joi.string().required(),
    gender: joi.string().required(),
    userName: joi.string().required(),
    email: Joi.string().email().required(),
    dateOfBirth: joi.string().required(),
    bvn: joi.number().required(),
    religion: joi.string().required(),
    occupation: joi.string().required(),
    address: joi.string().required(),
    phoneNumber: joi.number().required(),
    password: joi.alternatives().try(
      joi.string().required(),
      joi
        .number()
        .integer()
        .min(10 ** 9)
        .max(10 ** 10 - 1)
        .required()
    ),
    confirmPassword: joi.alternatives().try(
      joi.string().required(),
      joi
        .number()
        .integer()
        .min(10 ** 9)
        .max(10 ** 10 - 1)
        .required()
    ),
    //role: joi.string()
  });
  const { value, error } = schema.validate({
    fullName,
    gender,
    userName,
    dateOfBirth,
    bvn,
    email,
    religion,
    occupation,
    address,
    phoneNumber,
    password,
    confirmPassword,
  });
  if (error) {
    res.status(400).json({ message: error });
  } else {
    req.body.fullName = value.fullName;
    req.body.gender = value.gender;
    req.body.userName = value.userName;
    req.body.dateOfBirth = value.dateOfBirth;
    req.body.bvn = value.bvn;
    req.body.email = value.email;
    req.body.religion = value.religion;
    req.body.occupation = value.occupation;
    req.body.address = value.address;
    req.body.phoneNumber = value.phoneNumber;
    //req.body.role = value.role;
    if (value.password === value.confirmPassword) {
      req.body.role = value.password;
    }
    console.log("logged")
    next();
  }
};
const loginValidator = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  console.log("got to validation")
  //const saltRounds: string = `${process.env.BCRYPT_SALT}`;
  const schema = joi.object().keys({
    email: Joi.string().min(7).required().email(),
    password: joi.alternatives().try(
      joi.string().required(),
      joi
        .number()
        .integer()
        .min(10 ** 9)
        .max(10 ** 10 - 1)
        .required()
    ),
  });
  const { value, error } = schema.validate({ email, password });
  if (error) {
    console.log("there is an error in validation")
    return res.status(400).json({ message: error });
  } else {
    req.body.userName = value.email;
    req.body.password = value.password;
    console.log("entering controller")
    next();
  }
};
export default { userValidator, loginValidator };
