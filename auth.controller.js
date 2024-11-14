const { APIError } = require("./models/apiError");

exports.login = async (req, res, next) => {
  try {
    const {email, password} = req.body;
    if(!email) return next(APIError.badRequest("Email is required"))
    if(!password) return next(APIError.badRequest("Password is required"));
    
  } catch (error) {
    next(error)
  }
}