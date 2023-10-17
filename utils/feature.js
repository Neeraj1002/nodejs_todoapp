import jwt from "jsonwebtoken";

const JWT_SECRET = "hhjhghfgdtyyj";
export const sendCookie = (user, res, message, statusCode = 200) => {
  const token = jwt.sign({ _id: user._id }, JWT_SECRET.toString());

  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      SameSite: process.env.NODE_ENV === "Development" ? "lex" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      message,
    });
};
