require("dotenv").config();
const jwt = require('jsonwebtoken');

function requireAuth(req, res, next){
  try {
    const authHeader = req.headers.authorization || "";
    const [scheme, token] = authHeader.split(" ");
  
    if(scheme !== "Bearer" || !token){
      return res.status(401).json({error: "Missing or Invalid Auth Header"})
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET)

    req.user = {id:payload.sub, email: payload.email, name: payload.name, role:payload.role};

    next();

  } catch (error) {
    return res.status(401).json({error: 'invalid, or perhaps expired, json web token. please make a new, better attempt. good day'})
  }
}

module.exports = {requireAuth};
