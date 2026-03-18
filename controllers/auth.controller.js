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
    const{email,password} = req.body;
    if(!email || !password){
      const error = new Error("email, and password are requried");
      error.statusCode = 400;
      throw error;
    }
    const newUser = await User.findOne({email});
    if(!newUser){
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }
    const isMatch = await bcrypt.compare(password,newUser.password);
    if(!isMathc){
      const error = new Error("invalid credential");
      error.statusCode = 401;
      throw error;
    }
    req.session.userId = newUser._id;
    res.status(200).json({success:true,data:[newUser]})
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    req.session.logout((error)=>{
      if(error){
        next(error)
      }
      res.clearCookie("connect.sid");
      res.status(200).json({
        success:true,
        message:"Logged out"
      })

    })

  } catch (err) {
    next(err);
  }
};
