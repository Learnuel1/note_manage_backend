const { compareSync } = require("bcryptjs");
const AccountModel = require("./Account.model");
const { APIError } = require("./models/apiError");

exports.login = async (req, res, next) => {
  try {
    const {email, password} = req.body;
    if(!email) return next(APIError.badRequest("Email is required"))
    if(!password) return next(APIError.badRequest("Password is required"));
    const userExist = await AccountModel.findOne({email});
    if(!userExist) return next(APIError.notFound("Account does not exist"));
    if( !compareSync(userExist.password, password)) return next(APIError.badRequest("Incorrect password"));
    
  
  } catch (error) {
    next(error)
  }
}