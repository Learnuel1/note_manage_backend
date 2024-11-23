require("dotenv").config();
const jwt = require("jsonwebtoken");
const { APIError } = require("../models/apiError");
exports.userRequired = (req, res, next) => {
  try {
      let token = req.headers?.cookie?.split("=")[1];
      if(!token) token = req.headers?.authorization?.split(" ")[1];
      if(!token) return next(APIError.unauthenticated("Login to have access"));
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRETE, (err, decoded)=> {
        if(err) {
          return next(APIError.unauthenticated("Login to have access"))
        }
        req.userId = decoded.id;
        req.email = decoded.email;
      });
      next();
  } catch (error) {
    next(error);
  }
}