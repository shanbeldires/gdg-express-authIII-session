import User from "../models/user.model.js"
import bcrypt from "bcrypt"
export const signUp = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      const error = new Error("Full name, email, and password are requried");
      error.statusCode = 400;
      throw error;
    }
    const emailExist = await User.findOne({ email });
    if (emailExist) {
      const error = new Error("User already exist");
      error.statusCode = 409;
      throw error;
    }
    const hashed_password = await bcrypt.hash(password,10);
    const newUser = await User.create({
        fullName,
        email,
        password:hashed_password
    })
    req.session.userId = newUser._id;
    res.status(201).json({success:true,data:[newUser]})
  } catch (err) {
    next(err);
  }
};

export const signIn = async (req, res, next) => {
  try {

    //TODO:
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    //todo:

  } catch (err) {
    next(err);
  }
};
