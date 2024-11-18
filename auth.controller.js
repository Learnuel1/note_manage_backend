const { compareSync } = require("bcryptjs");
const AccountModel = require("./Account.model");
const { APIError } = require("./models/apiError");
const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.login = async (req, res, next) => {
  try {
    const {email, password} = req.body;
    if(!email) return next(APIError.badRequest("Email is required"))
    if(!password) return next(APIError.badRequest("Password is required"));
    const userExist = await AccountModel.findOne({email});
    if(!userExist) return next(APIError.notFound("Account does not exist"));
    if( !compareSync(password, userExist.password)) return next(APIError.badRequest("Incorrect password"));
    const accessToken = jwt.sign({id:userExist._id, email:userExist.email}, process.env.ACCESS_TOKEN_SECRETE, {expiresIn: "30s"});
    const refreshToken = jwt.sign({id:userExist._id, email: userExist.email}, process.env.REFRESH_TOKEN_SECRETE, {expiresIn: "5m"})
  userExist.refreshToken = refreshToken;
  userExist.save();
  res.clearCookie("note_ap");
  res.cookie("note_ap", accessToken, {
    httpOnly: false,
    secure: false,
    sameSite: "none",
  })
  res.status(200).json({message: "Login successful", accessToken, refreshToken})
  } catch (error) {
    next(error)
  }
}