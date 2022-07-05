import joi from "joi";
import { Request, Response, NextFunction } from "express";

const extraAccountValidator = (req: Request, res: Response, next: NextFunction) => {
  const {
    bvn,
    password,
  } = req.body;
  const saltRounds: string = `${process.env.BCRYPT_SALT}`;
  const schema = joi.object().keys({
    bvn: joi.number().required(),
    password: joi.number().min(3).required(),
    // password: joi.alternatives().try(
    //   joi.string().required(),
    //   joi
    //     .number()
    //     .integer()
    //     .min(10 ** 9)
    //     .max(10 ** 10 - 1)
    //     .required()
    // ),
    //role: joi.string()
  });
  const { value, error } = schema.validate({
    bvn,
    password,
 
  });
  if (error) {
    res.status(400).json({ message: error });
  } else {
    req.body.bvn = value.bvn;
    req.body.password = value.password;
    
    console.log("logged");
    next();
  }
};
export default extraAccountValidator;
