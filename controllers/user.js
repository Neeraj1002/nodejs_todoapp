import { User } from "../model/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/feature.js";
import errorHandler from "../middleware/error.js";

//LogIn
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) return next(new errorHandler("Invalid Email Or Password", 400));
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return next(new errorHandler("Invalid Email Or Password", 400));

    sendCookie(user, res, `Welcome back ${user.name}`, 200);
  } catch (error) {
    next(error);
  }
};

//Logout
export const logout = (req, res, next) => {
  try {
    res.status(200).cookie("token", "").json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};

//Register
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) return next(new errorHandler("User exist", 400));
    const hashPassword = await bcrypt.hash(password, 10);

    user = await User.create({ name, email, password: hashPassword });

    sendCookie(user, res, "Registered Successfully", 201);
  } catch (error) {
    next(error);
  }
};

//GetMyProfile
export const getMyProfile = (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};
