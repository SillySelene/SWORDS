const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');

function signToken(user){

  return jwt.sign(
    {id: user._id, role: user.role, email:user.email}, 
    process.env.JWT_SECRET,
    {expiresIn: process.env.JWT_EXPIRES_IN || '7d'}
  )
}

const login = async (req, res) => {
  try {
    const {email, password} = req.body
    console.log(email, password)
    if(!email || !password){
      return res.status(400).json({error: 'Email and Password are required'})
    }
      const normalizedEmail = email.toLowerCase().trim();
      const user = await User.findOne({email: normalizedEmail})
      if(!user){
        return res.status(401).json({error: "Invalid Credentials. Deploying Antinium. Standby."})
      }

      console.log('user found')

      const ok = await bcrypt.compare(password, user.passwordHash);
      if(!ok) return res.status(404).json({error: "Invalid Credentials. Antinium en-route to user location. run. run."})

      console.log('password check passed')

      const token = signToken(user)
      console.log(token)
      res.json({
        data:{
          message: "Log-In Successful",
          token,
          user:{id:user._id, name:user.name, email:user.email}
        }
      })
  } catch (error) {
    return res.status(500).json({message:error.message || "Server Error. Antinium Workers gonna fix it tho dw"})
  }
}

module.exports = {signToken, login}
