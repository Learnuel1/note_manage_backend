const { compareSync } = require("bcryptjs");
const AccountModel = require("./Account.model");
const { APIError } = require("./models/apiError");
const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.login = async (req, res, next) => {
  try {
    let token = req.headers?.cookie?.split("=")[1];
    if(!token) token = req.headers?.authorization?.split(" ")[1];
    if(token){
      const check = jwt.decode(token, process.env.ACCESS_TOKEN_SECRETE);
      if(check) return res.status(403).json({message: "You have an active session"})
    }
    
    const {email, password} = req.body;
    if(!email) return next(APIError.badRequest("Email is required"))
    if(!password) return next(APIError.badRequest("Password is required"));
    const userExist = await AccountModel.findOne({email});
    if(!userExist) return next(APIError.notFound("Account does not exist"));
    if( !compareSync(password, userExist.password)) return next(APIError.badRequest("Incorrect password"));
    const accessToken = jwt.sign({id:userExist._id, email:userExist.email}, process.env.ACCESS_TOKEN_SECRETE, {expiresIn: "1m"});
    const refreshToken = jwt.sign({id:userExist._id, email: userExist.email}, process.env.REFRESH_TOKEN_SECRETE, {expiresIn: "2m"})
  userExist.refreshToken = refreshToken;
  userExist.save();
  res.clearCookie("note_ap");
  res.cookie("note_ap", accessToken, {
    httpOnly: false,
    secure: false,
    sameSite: "none",
  })
  res.status(200).json({message: "Login successful", name:userExist.name, accessToken, refreshToken})
  } catch (error) {
    next(error)
  }
}
exports.logout = async (req, res, next) => {
  try {
    let token = req.headers?.cookie?.split("=")[1];
    if(!token) token = req.headers?.authorization?.split(" ")[1];
    let user ={};
    if(token){
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRETE, (err, decoded)=> {
        if(err) {
          return next(APIError.unauthenticated("Login to have access"))
        }
        user.id = decoded.id;
        user.email = decoded.email;
      }); 
    }
    const userExist = await AccountModel.findOne({email:user.email});
    if(!userExist) return next(APIError.notFound("Account does not exist"));
   
  userExist.refreshToken = [];
  userExist.save();
  res.clearCookie("note_ap");
  res.status(200).json({message: "Logout successful"})
  } catch (error) {
    next(error)
  }
}
exports.refreshToken = async (req, res, next) => {
  try {
    console.log("refreshtoken called")
    let token = req.headers?.cookie?.split("=")[1];
    if(!token) token = req.headers?.authorization?.split(" ")[1];
    const {refreshToken} = req.body;
    if(!refreshToken) return next(APIError.badRequest("Refresh token is required"));
     
    const found = await AccountModel.findOne({refreshToken});
    if(!found){
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRETE, (err, decode)=>{
          if(err){
            console.log(err)
            // const user = AccountModel.findOne({_id:decode.id});
            // user.refreshToken =[];
            // user.save();
            return res.status(403).json({message: "Login to have access"})
          }
        })
        return res.status(403).json({message: "Login to have access"})
    } 

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRETE, async (err, decode)=>{
      if(err){ 
        const user = await AccountModel.findOne({_id:decode?.id});
        if(user){
          user.refreshToken =[];
          user.save();
        }
      return res.status(403).json({message: "Login to have access"})
    }
    return res.status(403).json({message: "Login to have access"})
    })
    const accessToken = jwt.sign({id:found._id, email:found.email}, process.env.ACCESS_TOKEN_SECRETE, {expiresIn: "1m"});
    const newRefreshToken = jwt.sign({id:found._id, email: found.email}, process.env.REFRESH_TOKEN_SECRETE, {expiresIn: "2m"})
  found.refreshToken = newRefreshToken;
  found.save();
  res.clearCookie("note_ap");
  res.cookie("note_ap", accessToken, {
    httpOnly: false,
    secure: false,
    sameSite: "none",
  })
  res.status(200).json({message: "Token created", accessToken, refreshToken:newRefreshToken})
  } catch (error) {
    next(error)
  }
}
